import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeWorkType } from './employee-work-type.model';
import { CreateEmployeeWorkTypeDto } from './dto/create-employee-work-type.dto';

@Injectable()
export class EmployeeWorkTypeService {
  constructor(@InjectRepository(EmployeeWorkType) private employeeWorkTypeRepository: Repository<EmployeeWorkType>) {}

  async createEmployeeWorkType(dto: CreateEmployeeWorkTypeDto) {
    const employeeWorkType = await this.employeeWorkTypeRepository.create(dto);

    return employeeWorkType;
  }

  async getAllEmployeeWorkType() {
    const employeeWorkTypes = await this.employeeWorkTypeRepository.find();

    return employeeWorkTypes;
  }
}
