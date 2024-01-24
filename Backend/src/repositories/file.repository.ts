/* eslint-disable prettier/prettier */
import { ClientModel } from '../models/client.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
    private file: any
    private formattedJson: ClientModel[]

    async saveFile(file: any) {
        this.file = file;
    }

    async saveJson(json: ClientModel[]) {
        this.formattedJson = json;
    }

    async getFile() {
        return this.file;
    }

    async getJson() {
        return this.formattedJson;
    }    
}