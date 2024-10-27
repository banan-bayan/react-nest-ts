import { Injectable, NotFoundException } from '@nestjs/common';
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
    const role = this.roleRepository.create(dto);

    return this.roleRepository.save(role);
  }

  async getAllRoles() {
    const roles = await this.roleRepository.find();

    return roles;
  }

  async getRoleById(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Роль с ID ${id} не найдена`);
    }

    return role;
  }

  async getRoleByName(description: string) {
    
    const role = await this.roleRepository.findOne({ where: { description } });

    if (!role) {
      throw new NotFoundException(`Роль ${description} не найдена`);
    }

    return role;
  }

  async removeRole(id: number) {
    const role = await this.getRoleById(id);

    return this.roleRepository.remove(role);
  }

}
