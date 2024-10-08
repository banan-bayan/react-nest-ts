import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.model';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) {}

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(dto as any); // не забыть типизировать
    
    return await this.employeeRepository.save(employee);
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.find();

    return employees;
  }

  // async deleteEmployee() {

  // }
}
