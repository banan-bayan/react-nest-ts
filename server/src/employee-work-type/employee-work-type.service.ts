import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getEmployeeWorkType(id: number) {
    const employeeWorkType = await this.employeeWorkTypeRepository.findOneBy({id});

    if (!employeeWorkType) {
      throw new NotFoundException(`Тип работ с ID ${id} не найден`);
    }

    return employeeWorkType;
  }

  async removeEmployeeWorkType(id: number) {
    const employeeWorkType = await this.getEmployeeWorkType(id);

    return this.employeeWorkTypeRepository.remove(employeeWorkType);
  }
  
}
