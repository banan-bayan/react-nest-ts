import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/entities/roles.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService]
})
export class UsersModule {}
