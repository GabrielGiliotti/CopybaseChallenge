/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MetricasController } from './controllers/metricas.controller';

@Module({
  imports: [],
  controllers: [MetricasController],
  providers: [],
})
export class AppModule {}
