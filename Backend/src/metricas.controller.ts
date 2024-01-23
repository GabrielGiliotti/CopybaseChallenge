/* eslint-disable prettier/prettier */

import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileRepository } from "./file.repository";

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Controller('/metricas')
export class MetricasController {

    private fileRepository = new FileRepository();

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async fileProcessing(@UploadedFile(
        new ParseFilePipeBuilder()
          .addFileTypeValidator({ fileType: 'text/csv' })
          .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
          .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File) {
        
        try {
            this.fileRepository.saveFile(file);
            const result = await this.fileRepository.buildJson(file.buffer);
            return { message: 'Arquivo salvo com sucesso na memoria', file: result, status: 200 };
        }
        catch {
            return { message: 'Erro ao fazer upload de arquivo', status: 500 };
        }
    }

    @Get('mrr')
    async metricaMRR(@Query('months') months: number) {

        const array = await this.fileRepository.getJson();
        const sorted = await this.fileRepository.sortArray(array);
        
        const arrayMonth = await this.fileRepository.formatDataByMonth(sorted);

        // Calcula MRR
        arrayMonth.forEach(m => {
            let receitaMensalTotal = 0; // Soma do valor mensal de cada customer
            m.clients.ativos.ano2022.forEach(c => {
                receitaMensalTotal += c.valorMensal;
            });
            m.mrr = Number((receitaMensalTotal * m.clients.ativos.ano2022.length).toFixed(2));
        });

        const chartedData = {
            labels: [],
            data: []
        }

        arrayMonth.forEach(m => {
            chartedData.labels.push(m.month);
            chartedData.data.push(m.mrr);
        });

        //console.log(chartedData.data);

        if(months <= 3) {
            chartedData.data.splice(3, chartedData.data.length-1);
            chartedData.labels.splice(3, chartedData.labels.length-1);
        } else if (months >= 4 && months <= 6) {
            chartedData.data.splice(6, chartedData.data.length-1);
            chartedData.labels.splice(6, chartedData.labels.length-1);
        } else if (months >= 7 && months <= 9) {
            chartedData.data.splice(9, chartedData.data.length-1);
            chartedData.labels.splice(9, chartedData.labels.length-1);
        }

        return chartedData;
    }

    @Get('churn-rate')
    async metricaChurnRate() {

        const array = await this.fileRepository.getJson();
        const sorted = await this.fileRepository.sortArray(array);
        const arrayMonth = await this.fileRepository.formatDataByMonth(sorted);

        // Calculo Churn Rate
        arrayMonth.forEach(m => {
            const churn = m.clients.cancelados.ano2022.length / m.clients.ativos.ano2022.length;
            m.churnRate = Number((churn * 100).toFixed(2));
        });

        const chartedData = {
            labels: [],
            data: []
        }

        arrayMonth.forEach(m => {
            chartedData.labels.push(m.month);
            chartedData.data.push(m.churnRate);
        });

        return chartedData;
    }
}