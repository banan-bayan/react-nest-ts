import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { DataSeedService } from './data-seed.service';
import { Role } from 'src/roles/entities/roles.entity';
import { User } from 'src/users/entities/users.entity';
import { EmployeeBaseSchedule } from 'src/employee-base-schedule/entities/employee-base-schedule.entity';
import { EmployeeWorkType } from 'src/employee-work-type/entities/employee-work-type.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Employee, EmployeeType, EmployeeWorkType, Role, User, EmployeeBaseSchedule]),],
  providers: [DataSeedService],
})
export class DataSeedModule implements OnModuleInit {
  constructor(private readonly dataSeedService: DataSeedService) {}

  async onModuleInit() {
    await this.dataSeedService.seed();
  }
}
