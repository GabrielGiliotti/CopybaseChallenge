/* eslint-disable prettier/prettier */
import { ClientModel } from './client.model';

export class FileRepository {
    private file: any
    private formattedJson: ClientModel[]

    async saveFile(file: any) {
        this.file = file;
    }

    async getFile() {
        return this.file;
    }

    async getJson() {
        return this.formattedJson;
    }

    // Funções AUXILIARES 
    // Poderiam ser colocadas em um Servico ou Arquivo Utils

    async buildJson(fileBuffer: Buffer) {
        const csv = fileBuffer.toString();
        const array = csv.toString().split("\r");
        const result = [] as ClientModel[];
        const headers = array[0].split(", ")
        
        for (let i = 1; i < array.length; i++) {
            const obj = new ClientModel();
        
            const str = array[i]
            let s = ''
            let flag = 0

            for (let ch of str) {
                if (ch === '"' && flag === 0) {
                    flag = 1
                }
                else if (ch === '"' && flag == 1) flag = 0
                if (ch === ', ' && flag === 0) ch = '|'
                if (ch !== '"') s += ch
            }
        
            const properties = s.split("|")
           
            for (const j in headers) {
                const array1 = headers[j].split(",");
                const array2 = properties[j].split(",");

                array2[0] = array2[0].split("\n")[1];
                array2[6] = array2[6] + ',' + array2[7];
                array2.splice(7,1);

                for(let f = 0; f < array1.length; f++) {
                    obj[array1[f]] = array2[f];
                };
            }
        
            result.push(obj)
        }

        result.forEach(c => {
            c.valor = c.valor.replace(",", ".");

            if(c['cobrada a cada X dias'] === "365") {
                c['valor mensal'] = Number((parseFloat(c.valor) / 12).toFixed(2));
            } else {
                c['valor mensal'] = Number(parseFloat(c.valor).toFixed(2));
            }
        });

        this.formattedJson = result;
        return result;
    }

    async sortArray(array: ClientModel[]) {
        array.sort(function(a,b){
            const d1 = new Date(a["data início"]);
            const d2 = new Date(b["data início"]);

            if(d1 > d2) return 1;
            else if(d1 < d2) return -1;
            else return 0;
        });
        return array;
    }

    async formatArrayDate(array: ClientModel[], property: string) {
        array.forEach(client => {
            if(client[property].length > 0) {
                const mes = client[property].split("/")[0]
                const dia = client[property].split("/")[1];
                const ano = client[property].split("/")[2];
                client[property] = dia + '/' + mes + '/' + ano;
            }
        });
        return array;
    }

    async formatDataByMonth(array: ClientModel[]) {
        
        const arrayMonth = [
            {
                month: "Janeiro",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Fevereiro",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Março",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Abril",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Maio",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Junho",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Julho",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Agosto",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Setembro",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Outubro",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Novembro",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
            {
                month: "Dezembro",
                clients: {
                    ativos: [],
                    cancelados: []
                },
                mrr: 0
            },
        ];
        
        array.forEach(e => {
            const month = e["data início"].split("/")[1];
            if(e.status === "Ativa") {
                if(month === "1") arrayMonth[0].clients.ativos.push(e);
                if(month === "2") arrayMonth[1].clients.ativos.push(e);
                if(month === "3") arrayMonth[2].clients.ativos.push(e);
                if(month === "4") arrayMonth[3].clients.ativos.push(e);
                if(month === "5") arrayMonth[4].clients.ativos.push(e);
                if(month === "6") arrayMonth[5].clients.ativos.push(e);
                if(month === "7") arrayMonth[6].clients.ativos.push(e);
                if(month === "8") arrayMonth[7].clients.ativos.push(e);
                if(month === "9") arrayMonth[8].clients.ativos.push(e);
                if(month === "10") arrayMonth[9].clients.ativos.push(e);
                if(month === "11") arrayMonth[10].clients.ativos.push(e);
                if(month === "12") arrayMonth[11].clients.ativos.push(e);
            } else {
                if(month === "1") arrayMonth[0].clients.cancelados.push(e);
                if(month === "2") arrayMonth[1].clients.cancelados.push(e);
                if(month === "3") arrayMonth[2].clients.cancelados.push(e);
                if(month === "4") arrayMonth[3].clients.cancelados.push(e);
                if(month === "5") arrayMonth[4].clients.cancelados.push(e);
                if(month === "6") arrayMonth[5].clients.cancelados.push(e);
                if(month === "7") arrayMonth[6].clients.cancelados.push(e);
                if(month === "8") arrayMonth[7].clients.cancelados.push(e);
                if(month === "9") arrayMonth[8].clients.cancelados.push(e);
                if(month === "10") arrayMonth[9].clients.cancelados.push(e);
                if(month === "11") arrayMonth[10].clients.cancelados.push(e);
                if(month === "12") arrayMonth[11].clients.cancelados.push(e);
            }
        });

        return arrayMonth;
    }
}