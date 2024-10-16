import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);

    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.find();

    return roles;
  }

  async getRoleByName(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });

    return role;
  }
}
