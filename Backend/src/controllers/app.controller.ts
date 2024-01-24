/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {    

    @Get()
    async home() {
        return 'Nest.js API'
    }
}