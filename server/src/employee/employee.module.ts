import { Module, forwardRef } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeTypeService } from 'src/employee-type/employee-type.service';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeTypeService],
  imports: [TypeOrmModule.forFeature([Employee, EmployeeType]), forwardRef(() => AuthModule)]
})
export class EmployeeModule {}
