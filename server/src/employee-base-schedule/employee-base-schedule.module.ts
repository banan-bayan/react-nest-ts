import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeBaseSchedule } from './entities/employee-base-schedule.entity';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseScheduleController } from './employee-base-schedule.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmployeeBaseScheduleController],
  providers: [EmployeeBaseScheduleService],
  imports: [TypeOrmModule.forFeature([EmployeeBaseSchedule]), forwardRef(() => AuthModule)]
})
export class EmployeeBaseScheduleModule {}
