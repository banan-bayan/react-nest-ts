import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSlotSchedule } from './employee-slot-schedule.model';

import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';
import { EmployeeSlotScheduleController } from './employee-slot-schedule.controller';

@Module({
  controllers: [EmployeeSlotScheduleController],
  providers: [EmployeeSlotScheduleService],
  imports: [TypeOrmModule.forFeature([EmployeeSlotSchedule])]
})
export class EmployeeSlotScheduleModule {}
