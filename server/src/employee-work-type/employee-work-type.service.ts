import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EmployeeWorkType } from './entities/employee-work-type.entity';
import { CreateEmployeeWorkTypeDto } from './dto/create-employee-work-type.dto';

@Injectable()
export class EmployeeWorkTypeService {
  constructor(@InjectRepository(EmployeeWorkType) private employeeWorkTypeRepository: Repository<EmployeeWorkType>) {}

  async createEmployeeWorkType(dto: CreateEmployeeWorkTypeDto) {
    const employeeWorkType = this.employeeWorkTypeRepository.create(dto);

    return this.employeeWorkTypeRepository.save(employeeWorkType);;
  }

  async getAllEmployeeWorkType() {
    const employeeWorkTypes = await this.employeeWorkTypeRepository.find();

    return employeeWorkTypes;
  }

  async getEmployeeWorkTypesByIds(ids: number[]) {
      const employeeWorkTypes = await this.employeeWorkTypeRepository.find({ where: { id: In(ids) }});
  
    if (!employeeWorkTypes.length) {
      throw new NotFoundException(`Типы работ с ID ${ids.join(', ')} не найдены`);
    }
  
    return employeeWorkTypes;
  }

  async getEmployeeWorkTypeById(id: number) {
    const employeeWorkType = await this.employeeWorkTypeRepository.findOneBy({id});

    if (!employeeWorkType) {
      throw new NotFoundException(`Тип работ с ID ${id} не найден`);
    }

    return employeeWorkType;
  }

  async removeEmployeeWorkType(id: number) {
    const employeeWorkType = await this.getEmployeeWorkTypeById(id);

    return this.employeeWorkTypeRepository.remove(employeeWorkType);
  }
  
}
