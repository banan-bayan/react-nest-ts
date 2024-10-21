import { Module } from '@nestjs/common'; // декаратор - это обёртка которая добавляет классу или функции новый функционал
import { TypeOrmModule} from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { EmployeeTypeModule } from './employee-type/employee-type.module';
import { EmployeeWorkTypeModule } from './employee-work-type/employee-work-type.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeBaseScheduleModule } from './employee-base-schedule/employee-base-schedule.module';
import { EmployeeSlotScheduleModule } from './employee-slot-schedule/employee-slot-schedule.module';
import { WorkRequestModule } from './work-request/work-request.module';
import { AuthModule } from './auth/auth.module';
import { SwaggerConfigService } from './swagger/swagger.service';
// import { JwtService } from '@nestjs/jwt';

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
