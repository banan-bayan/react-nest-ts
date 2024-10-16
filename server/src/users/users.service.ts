import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
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
    const role = await this.roleService.getRoleByName('User');

    if (!role) {
      throw new BadRequestException();
    }

    const user = this.usersRepository.create({...userDto, roles: [role]});
  
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  async getAllUser() {
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
}
