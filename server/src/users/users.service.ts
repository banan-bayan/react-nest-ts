import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
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
    const role = await this.roleService.getRoleByName('User');

    const user = this.usersRepository.create({ ...userDto, roles: [role] });

    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      relations: { roles: true },
    });

    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { roles: true },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error(`Пользователь с ID ${id} не найден`);
    }

    return user;
  }

  async removeUser(id: number) {
    const user = await this.getUserById(id);

    return this.usersRepository.remove(user);
  }

  async getWorkRequestsByUserId(id: number) {
    const workRequests = await this.usersRepository.find({
      where: { id },
      relations: ['workRequest'],
    });

    if (!workRequests.length) {
      throw new NotFoundException(`Заявки пользователя с ID ${id} не найдены`);
    }
  }
}
