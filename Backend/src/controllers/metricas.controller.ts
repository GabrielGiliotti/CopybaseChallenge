/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProcessDataService } from "../services/process.data.service";

const MAX_FILE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Controller('/metricas')
export class MetricasController {

    constructor(private readonly processDataService: ProcessDataService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async fileProcessing(@UploadedFile(
        new ParseFilePipeBuilder()
          .addFileTypeValidator({ fileType: 'text/csv' })
          .addMaxSizeValidator({ maxSize: MAX_FILE_SIZE_IN_BYTES })
          .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File) {
        
        try {
            await this.processDataService.saveFile(file);
            const result = await this.processDataService.buildJson(file.buffer);
            return { message: 'Arquivo salvo com sucesso na memoria', file: result, status: 200 };
        }
        catch {
            return { message: 'Erro ao fazer upload de arquivo', status: 500 };
        }
    }

    @Get('mrr')
    async metricaMRR(@Query('months') months: number) {

        const arrayMonth = await this.processDataService.preProcessingData();

        // Calcula MRR
        arrayMonth.forEach(m => {
            let receitaMensalTotal = 0; // Soma do valor mensal de cada customer
            m.clients.ativos.ano2022.forEach(c => {
                receitaMensalTotal += c.valorMensal;
            });
            m.mrr = Number((receitaMensalTotal).toFixed(2));
        });

        return await this.processDataService.filterByMonth(arrayMonth, months, 'mrr');
    }

    @Get('churn-rate')
    async metricaChurnRate(@Query('months') months: number) {

        const arrayMonth = await this.processDataService.preProcessingData();

        // Calculo Churn Rate
        arrayMonth.forEach(m => {
            const churn = m.clients.cancelados.ano2022.length / m.clients.ativos.ano2022.length;
            m.churnRate = Number((churn * 100).toFixed(2));
        });

        return await this.processDataService.filterByMonth(arrayMonth, months, 'churn');
    }
}