import { Module, forwardRef } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { EmployeeTypeController } from './employee-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmployeeTypeController],
  providers: [EmployeeTypeService],
  imports: [TypeOrmModule.forFeature([EmployeeType]), forwardRef(() => AuthModule)],
})
export class EmployeeTypeModule {}
