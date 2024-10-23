import { Module, forwardRef } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';
import { WorkRequestController } from './work-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRequest } from './entities/work-request.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { EmployeeTypeService } from 'src/employee-type/employee-type.service';

@Module({
  controllers: [WorkRequestController],
  providers: [WorkRequestService, EmployeeTypeService],
  imports: [TypeOrmModule.forFeature([WorkRequest, EmployeeType]), forwardRef(() => AuthModule)]
})

export class WorkRequestModule {}
