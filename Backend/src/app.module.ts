/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MetricasController } from './controllers/metricas.controller';
import { AppController } from './controllers/app.controller';
import { ProcessDataService } from './services/process.data.service';
import { FileRepository } from './repositories/file.repository';

@Module({
  imports: [],
  controllers: [AppController, MetricasController],
  providers: [ProcessDataService, FileRepository],
})
export class AppModule {}
