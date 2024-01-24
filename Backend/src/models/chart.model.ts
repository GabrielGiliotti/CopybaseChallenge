/* eslint-disable prettier/prettier */

import { ClientModel } from "./client.model";

export class ChartModel {
    month: string
    clients: Clients
    mrr: number
    customerChurnRate: number
    revenueChurnRate: number
}

export class Clients {
    ativos: AtivosCancelados
    cancelados: AtivosCancelados
}

export class AtivosCancelados {
    ano2022: ClientModel[]
    ano2023: ClientModel[]
}

    
