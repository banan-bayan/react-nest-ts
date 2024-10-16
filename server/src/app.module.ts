import { Module } from '@nestjs/common'; // декаратор - это обёртка которая добавляет классу или функции новый функционал
import { TypeOrmModule} from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/users.entity';
import { Role } from './roles/entities/roles.entity';
import { EmployeeType } from './employee-type/entities/employee-type.entity';
import { EmployeeWorkType } from './employee-work-type/employee-work-type.model';
import { Employee } from './employee/entities/employee.entity';
import { EmployeeBaseSchedule } from './employee-base-schedule/employee-base-schedule.model';
import { EmployeeSlotSchedule } from './employee-slot-schedule/employee-slot-schedule.model';
import { WorkRequest } from './work-request/entities/work-request.entity';
import { RolesModule } from './roles/roles.module';
import { EmployeeTypeModule } from './employee-type/employee-type.module';
import { EmployeeWorkTypeModule } from './employee-work-type/employee-work-type.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeBaseScheduleModule } from './employee-base-schedule/employee-base-schedule.module';
import { EmployeeSlotScheduleModule } from './employee-slot-schedule/employee-slot-schedule.module';
import { WorkRequestModule } from './work-request/work-request.module';
import { AuthModule } from './auth/auth.module';
import { SwaggerConfigService } from './swagger/swagger.service';

@Module({
  controllers: [], // чтобы заработал контроллер его регаем в модуле
  providers: [SwaggerConfigService], // тут используется любой переиспользуемый компонент или сервисы с логикой (SERVICE)
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database:  process.env.POSTGRES_DB,
      entities: [
        User,
        Role,
        WorkRequest,
        __dirname + '../*.entity{.ts,.js}',
    ],
      synchronize: !!process.env.POSTGRES_SYNCHRONIZE,
      autoLoadEntities: true
    }),
    UsersModule,
    RolesModule,
    EmployeeTypeModule,
    EmployeeWorkTypeModule,
    EmployeeModule,
    EmployeeBaseScheduleModule,
    EmployeeSlotScheduleModule,
    WorkRequestModule,
    AuthModule,
  ],
})
export class AppModule {}
