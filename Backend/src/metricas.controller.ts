/* eslint-disable prettier/prettier */

import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
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
    async metricaMRR() {

        const array = await this.fileRepository.getJson();
        const sorted = await this.fileRepository.sortArray(array);
        const formatted = await this.fileRepository.formatArrayDate(sorted, 'data início');
        const arrayMonth = await this.fileRepository.formatDataByMonth(formatted);

        // calcular MRR
        arrayMonth.forEach(m => {
            let receitaMensalTotal = 0; // Soma do valor mensal de cada customer
            m.clients.ativos.forEach(c => receitaMensalTotal += c["valor mensal"]);

            // como cada customer paga um valor unico, basta somar o valor mensal de cada um
            // que ja temos o valor MRR para o mes

            // porem faremos a receita media para cada mes, isso é, o total da receita
            // dividido pelo numero de clientes ativos, dando uma visão melhor do valor
            // medio recebido no mes por todos os clientes

            const receitaMensalMedia = receitaMensalTotal / m.clients.ativos.length
            m.mrr = Number((receitaMensalMedia * m.clients.ativos.length).toFixed(2));
        });

        const chartedData = {
            labels: [],
            data: []
        }

        arrayMonth.forEach(m => {
            chartedData.labels.push(m.month);
            chartedData.data.push(m.mrr);
        });

        return chartedData;
    }

    @Get('churn-rate')
    async metricaChurnRate() {

        return this.fileRepository.getFile();
    }
}