import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSlotSchedule } from './entities/employee-slot-schedule.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';
import { EmployeeSlotScheduleController } from './employee-slot-schedule.controller';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeTypeModule } from 'src/employee-type/employee-type.module';

@Module({
  controllers: [EmployeeSlotScheduleController],
  providers: [EmployeeSlotScheduleService, EmployeeService],
  imports: [
    TypeOrmModule.forFeature([EmployeeSlotSchedule, Employee]),
    forwardRef(() => AuthModule),
    forwardRef(() => EmployeeTypeModule),
  ],
})
export class EmployeeSlotScheduleModule {}
