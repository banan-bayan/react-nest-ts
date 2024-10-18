import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeType } from './entities/employee-type.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';

@Injectable()
export class EmployeeTypeService {
  constructor(
    @InjectRepository(EmployeeType)
    private EmployeeTypeRepository: Repository<EmployeeType>,
  ) {}

  async createEmployeeType(dto: CreateEmployeeTypeDto) {
    const employeeType = this.EmployeeTypeRepository.create(dto);

    return employeeType;
  }

  async getAllEmployeeType() {
    const employeeTypes = await this.EmployeeTypeRepository.find();

    return employeeTypes;
  }

  async getEmployeeType(id: number) {
    const employeeType = await this.EmployeeTypeRepository.findOneBy({ id });

    if (!employeeType) {
      throw new Error(`Профессия с ID ${id} не найдена`);
    }

    return employeeType;
  }

  async removeEmployeeType(id: number) {
    const employeeType = await this.getEmployeeType(id);

    return await this.EmployeeTypeRepository.delete(employeeType);
  }
}
