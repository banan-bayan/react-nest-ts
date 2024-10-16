import { Module } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeTypeController } from './employee-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';

@Module({
  controllers: [EmployeeTypeController],
  providers: [EmployeeTypeService],
  imports: [TypeOrmModule.forFeature([EmployeeType])],
})
export class EmployeeTypeModule {}
