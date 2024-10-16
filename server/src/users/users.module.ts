import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/roles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Role]), forwardRef(() => RolesModule), forwardRef(() => AuthModule)],
  exports: [UsersService]
})
export class UsersModule {}
