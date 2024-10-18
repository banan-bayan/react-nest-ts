import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeWorkType } from './entities/employee-work-type.entity';
import { CreateEmployeeWorkTypeDto } from './dto/create-employee-work-type.dto';

@Injectable()
export class EmployeeWorkTypeService {
  constructor(@InjectRepository(EmployeeWorkType) private employeeWorkTypeRepository: Repository<EmployeeWorkType>) {}

  async createEmployeeWorkType(dto: CreateEmployeeWorkTypeDto) {
    const employeeWorkType = this.employeeWorkTypeRepository.create(dto);
    await this.employeeWorkTypeRepository.save(employeeWorkType);

    return employeeWorkType;
  }

  async getAllEmployeeWorkType() {
    const employeeWorkTypes = await this.employeeWorkTypeRepository.find();

    return employeeWorkTypes;
  }

  async getEmployeeWorkType(id: number) {
    const employeeWorkType = await this.employeeWorkTypeRepository.findOneBy({id});

    if (!employeeWorkType) {
      throw new Error(`Тип работ с ID ${id} не найден`);
    }

    return employeeWorkType;
  }

  async removeEmployeeWorkType(id: number) {
    const employeeWorkType = await this.getEmployeeWorkType(id);

    return await this.employeeWorkTypeRepository.remove(employeeWorkType);
  }
  
}
