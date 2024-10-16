import { Module } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';
import { WorkRequestController } from './work-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRequest } from './entities/work-request.entity';

@Module({
  controllers: [WorkRequestController],
  providers: [WorkRequestService],
  imports: [TypeOrmModule.forFeature([WorkRequest])]
})

export class WorkRequestModule {}
