import { Module, forwardRef } from '@nestjs/common';
import { EmployeeWorkTypeService } from './employee-work-type.service';
import { EmployeeWorkTypeController } from './employee-work-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeWorkType } from './entities/employee-work-type.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmployeeWorkTypeController],
  providers: [EmployeeWorkTypeService],
  imports: [TypeOrmModule.forFeature([EmployeeWorkType]), forwardRef(() => AuthModule)],
  exports: [EmployeeWorkTypeService]
})

export class EmployeeWorkTypeModule {}
