/* eslint-disable prettier/prettier */

import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileRepository } from "./file.repository";
import { ChartModel } from "./chart.model";

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

        const arrayMonth = await this.preProcessingData();

        // Calcula MRR
        arrayMonth.forEach(m => {
            let receitaMensalTotal = 0; // Soma do valor mensal de cada customer
            m.clients.ativos.ano2022.forEach(c => {
                receitaMensalTotal += c.valorMensal;
            });
            m.mrr = Number((receitaMensalTotal).toFixed(2));
        });

        return await this.filterByMonth(arrayMonth, months, 'mrr');
    }

    @Get('churn-rate')
    async metricaChurnRate(@Query('months') months: number) {

        const arrayMonth = await this.preProcessingData();

        // Calculo Churn Rate
        arrayMonth.forEach(m => {
            const churn = m.clients.cancelados.ano2022.length / m.clients.ativos.ano2022.length;
            m.churnRate = Number((churn * 100).toFixed(2));
        });

        return await this.filterByMonth(arrayMonth, months, 'churn');
    }

    // Colocar Service
    async preProcessingData() {
        
        const array = await this.fileRepository.getJson();
        const sorted = await this.fileRepository.sortArray(array);
        const arrayMonth = await this.fileRepository.formatDataByMonth(sorted);

        return arrayMonth;
    }

    async filterByMonth(arrayMonth: ChartModel[], months: number, metric: string) {

        const chartedData = {
            labels: [],
            data: []
        }

        arrayMonth.forEach(m => {
            chartedData.labels.push(m.month);
            if(metric === 'mrr') 
                chartedData.data.push(m.mrr);
            if(metric === 'churn') 
                chartedData.data.push(m.churnRate);
        });

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
}