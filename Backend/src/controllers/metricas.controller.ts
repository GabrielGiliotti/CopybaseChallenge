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

        /* Calculo MRR
        Durante a construcao do json no upload de dados, ja extraimos o faturamento anual,
        isso é, "cobranças a cada 365 dias" das contas ATIVAS, dividimos os pagamentos em 12
        meses e guardamos o somatorio de seus valores em um objeto onde cada atributo guarda
        o somatorio de um mes. Esse objeto é o faturamentoAnual */  
        const faturamentoAnualAtivo = await this.processDataService.getFaturamentoAnualAtivo();

        /* Então, para cada mes, devemos contabilizar ainda os clientes com "cobrançasa cada 30 dias".
        Logo, iteramos os clientes ATIVOS de cada mes e somamos na receita mensal total. Depois, 
        com o OBJETO de faturamento anual, somamos para cada mes a receita final e, por fim, calculamos
        o MRR de cada mês. */
        arrayMonth.forEach(m => {
            let receitaMensalTotal = 0; // Soma do valor mensal de cada customer
            m.clients.ativos.ano2022.forEach(c => {
                if(c["cobrada a cada X dias"] === '30')
                    receitaMensalTotal += c.valorMensal;
            });

            receitaMensalTotal = receitaMensalTotal + faturamentoAnualAtivo[m.month.substring(0,3).toLowerCase()];
            m.mrr = Number((receitaMensalTotal).toFixed(2));
        });

        return await this.processDataService.filterByMonth(arrayMonth, months, 'mrr');
    }

    @Get('customer-churn-rate')
    async metricaCustomerChurnRate(@Query('months') months: number) {

        const arrayMonth = await this.processDataService.preProcessingData();

        // Calculo Customer Churn Rate
        arrayMonth.forEach(m => {
            const churn = m.clients.cancelados.ano2022.length / m.clients.ativos.ano2022.length;
            m.customerChurnRate = Number((churn * 100).toFixed(2));
        });

        return await this.processDataService.filterByMonth(arrayMonth, months, 'customer-churn');
    }

    @Get('revenue-churn-rate')
    async metricaRevenueChurnRate(@Query('months') months: number) {

        const arrayMonth = await this.processDataService.preProcessingData();
        const faturamentoAnualAtivo = await this.processDataService.getFaturamentoAnualAtivo();
        const faturamentoAnualCancelado = await this.processDataService.getFaturamentoAnualCancelado();

        // Calculo Revenue Churn Rate
        arrayMonth.forEach(m => {
            let currentRevenue = 0;
            let lostRevenue = 0;

            m.clients.ativos.ano2022.forEach(c => {
                if(c["cobrada a cada X dias"] === '30')
                    currentRevenue += c.valorMensal;
            });

            m.clients.cancelados.ano2022.forEach(c => {
                if(c["cobrada a cada X dias"] === '30')
                    lostRevenue += c.valorMensal;
            });

            // Faturamento anual ativo de cada mes
            currentRevenue += faturamentoAnualAtivo[m.month.substring(0,3).toLowerCase()];

            // Calcular faturamento anual perdido de cada mes
            lostRevenue += faturamentoAnualCancelado[m.month.substring(0,3).toLowerCase()];

            const churn = lostRevenue / currentRevenue;
            m.revenueChurnRate = Number((churn * 100).toFixed(2));
        });

        return await this.processDataService.filterByMonth(arrayMonth, months, 'revenue-churn');
    }
}