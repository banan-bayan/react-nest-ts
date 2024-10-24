import { Module, forwardRef } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';
import { WorkRequestController } from './work-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRequest } from './entities/work-request.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { EmployeeTypeService } from 'src/employee-type/employee-type.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/roles.entity';
import { EmployeeSlotSchedule } from 'src/employee-slot-schedule/entities/employee-slot-schedule.entity';
import { EmployeeSlotScheduleService } from 'src/employee-slot-schedule/employee-slot-schedule.service';

@Module({
  controllers: [WorkRequestController],
  providers: [WorkRequestService, EmployeeTypeService, UsersService, RolesService, EmployeeSlotScheduleService],
  imports: [TypeOrmModule.forFeature([WorkRequest, EmployeeType, User, Role, EmployeeSlotSchedule]), forwardRef(() => AuthModule)]
})

export class WorkRequestModule {}
