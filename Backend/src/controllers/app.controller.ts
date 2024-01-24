/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { ProcessDataService } from "src/services/process.data.service";

@Controller()
export class AppController {    
    constructor(private readonly processDataService: ProcessDataService) {}

    @Get()
    async home() {
        return await this.processDataService.getDefaultPage();
    }
}