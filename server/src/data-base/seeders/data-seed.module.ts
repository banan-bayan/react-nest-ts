import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { DataSeedService } from './data-seed.service';
import { Role } from 'src/roles/entities/roles.entity';
import { User } from 'src/users/entities/users.entity';
import { EmployeeBaseSchedule } from 'src/employee-base-schedule/entities/employee-base-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, EmployeeType, Role, User, EmployeeBaseSchedule]),],
  providers: [DataSeedService],
})
export class DataSeedModule implements OnModuleInit {
  constructor(private readonly dataSeedService: DataSeedService) {}

  async onModuleInit() {
    await this.dataSeedService.seed();
  }
}


// app.module.ts

// import { DataSeedModule } from './database/seeders/data-seed.module';
// import { EmployeeModule } from './employee/employee.module';
// import { EmployeeTypeModule } from './employee-type/employee-type.module';
// import { WorkRequestModule } from './work-request/work-request.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot(),
//     EmployeeModule,
//     EmployeeTypeModule,
//     WorkRequestModule,
//     DataSeedModule, // Подключение модуля сидинга данных
//   ],
// })
// export class AppModule {}
