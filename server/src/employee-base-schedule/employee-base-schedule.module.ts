import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBaseSchedule } from './employee-base-schedule.model';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseScheduleController } from './employee-base-schedule.controller';

@Module({
  controllers: [EmployeeBaseScheduleController],
  providers: [EmployeeBaseScheduleService],
  imports: [TypeOrmModule.forFeature([EmployeeBaseSchedule])]
})
export class EmployeeBaseScheduleModule {}
