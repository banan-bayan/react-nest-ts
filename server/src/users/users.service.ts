import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const user = this.usersRepository.create(userDto);
    const role = await this.roleService.getRoleByRole('user');
    user.roles = [role];
    await this.usersRepository.save(user);
    return user;
  }

  async getAllUser() {
    const users = await this.usersRepository.find({ relations: ['roles'] });
    return users;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email }, relations: ['roles'] });

    return user || null;
  }
}
