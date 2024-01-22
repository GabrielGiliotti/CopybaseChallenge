/* eslint-disable prettier/prettier */

import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileRepository } from "./file.repository";

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Controller('/metricas')
export class MetricasController {

    private fileRepository = new FileRepository();

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async fileProcessing(@UploadedFile(
        new ParseFilePipeBuilder()
          .addFileTypeValidator({ fileType: 'text/csv' })
          .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
          .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File) {
        
        this.fileRepository.saveFile(file);

        const result = await this.fileRepository.buildJson(file.buffer);

        return {message: 'Arquivo salvo com sucesso na memoria', file: result};
    }

    @Get('mrr')
    async metricaMRR() {

        const array = await this.fileRepository.getJson();
        const sorted = await this.fileRepository.sortArray(array);
        const formatted = await this.fileRepository.formatArrayDate(sorted, 'data início');
        const arrayMonth = await this.fileRepository.formatDataByMonth(formatted);

        return arrayMonth;
    }

    @Get('churn-rate')
    async metricaChurnRate() {

        return this.fileRepository.getFile();
    }
}