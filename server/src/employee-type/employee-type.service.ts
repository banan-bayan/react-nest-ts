import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeType } from './employee-type.model';
import { Repository } from 'typeorm';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';

@Injectable()
export class EmployeeTypeService {
  constructor(@InjectRepository(EmployeeType) private EmployeeTypeRepository: Repository<EmployeeType>) {}

  async createEmployeeType(dto: CreateEmployeeTypeDto) {
    const employeeType = await this.EmployeeTypeRepository.create(dto);

    return employeeType;
  }

  async getAllEmployeeType() {
    const employeeTypes = await this.EmployeeTypeRepository.find();

    return employeeTypes;
  };

  

}
