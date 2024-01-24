/* eslint-disable prettier/prettier */
import { FaturamentoAnual } from 'src/models/faturamento.anual.model';
import { ClientModel } from '../models/client.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileRepository {
    private file: any
    private formattedJson: ClientModel[]
    private faturamentoAnualAtivo: FaturamentoAnual;
    private faturamentoAnualCancelado: FaturamentoAnual;


    async saveFile(file: any) {
        this.file = file;
    }

    async saveJson(json: ClientModel[]) {
        this.formattedJson = json;
    }

    async saveFaturamentoAnualAtivo(faturamento: FaturamentoAnual) {
        this.faturamentoAnualAtivo = faturamento;
    }

    async saveFaturamentoAnualCancelado(faturamento: FaturamentoAnual) {
        this.faturamentoAnualCancelado = faturamento;
    }

    async getFile() {
        return this.file;
    }

    async getJson() {
        return this.formattedJson;
    }    

    async getFaturamentoAnualAtivo() {
        return this.faturamentoAnualAtivo;
    }  

    async getFaturamentoAnualCancelado() {
        return this.faturamentoAnualCancelado;
    } 
}