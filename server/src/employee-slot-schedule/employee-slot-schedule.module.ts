import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSlotSchedule } from './entities/employee-slot-schedule.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';
import { EmployeeSlotScheduleController } from './employee-slot-schedule.controller';

@Module({
  controllers: [EmployeeSlotScheduleController],
  providers: [EmployeeSlotScheduleService],
  imports: [TypeOrmModule.forFeature([EmployeeSlotSchedule]), forwardRef(() => AuthModule)]
})
export class EmployeeSlotScheduleModule {}
