/* eslint-disable prettier/prettier */
import { FileRepository } from "../repositories/file.repository";
import { ChartModel } from "../models/chart.model";

export class ProcessDataService {
    
    public fileRepository = new FileRepository();

    async saveFile(file: any) {
        return this.fileRepository.saveFile(file);
    }

    async buildJson(fileBuffer: Buffer) {
        return this.fileRepository.buildJson(fileBuffer);
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