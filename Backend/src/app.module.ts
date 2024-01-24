/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MetricasController } from './controllers/metricas.controller';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [],
  controllers: [AppController, MetricasController],
  providers: [],
})
export class AppModule {}
