import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';
import { EmployeeWorkTypeModule } from 'src/employee-work-type/employee-work-type.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeSlotScheduleModule } from 'src/employee-slot-schedule/employee-slot-schedule.module';
import { EmployeeTypeModule } from 'src/employee-type/employee-type.module';
import { WorkRequestModule } from 'src/work-request/work-request.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => RolesModule),
    forwardRef(() => EmployeeWorkTypeModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => EmployeeSlotScheduleModule),
    forwardRef(() => EmployeeTypeModule),
    forwardRef(() => WorkRequestModule),
   
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
