import { Module, forwardRef } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeTypeController } from './employee-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeWorkType } from 'src/employee-work-type/entities/employee-work-type.entity';
import { EmployeeWorkTypeService } from 'src/employee-work-type/employee-work-type.service';
@Module({
  controllers: [EmployeeTypeController],
  providers: [EmployeeTypeService, EmployeeWorkTypeService],
  imports: [TypeOrmModule.forFeature([EmployeeType, EmployeeWorkType]), forwardRef(() => AuthModule)],
  exports: [EmployeeTypeService]
})
export class EmployeeTypeModule {}
