/* eslint-disable prettier/prettier */

import { ClientModel } from "./client.model";

export class ChartModel {
    month: string = ""
    clients: Clients = new Clients()
    mrr: number = 0
    customerChurnRate: number = 0
    revenueChurnRate: number = 0
}

class Clients {
    ativos: AtivosCancelados = new AtivosCancelados()
    cancelados: AtivosCancelados = new AtivosCancelados()
}

class AtivosCancelados {
    ano2022: ClientModel[] = []
    ano2023: ClientModel[] = []
}

export class ChartedData {
    labels: string[] = []
    data: number[] = []
} 

    
