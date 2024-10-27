import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) {}

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(dto as any); // TODO добавить типизацию или исправить dto

    return this.employeeRepository.save(employee);
  }
  

  async getAllEmployees() {
    const employees = await this.employeeRepository.find();

    return employees;
  }

  async getEmployee(id: number) {
    const employee = await this.employeeRepository.find({where: {id}, relations: { slotSchedules: true }});

    if (!employee) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }

    return employee;
  }

  async deleteEmployee(id: number) {
     const employee = await this.getEmployee(id);
    
     return  this.employeeRepository.remove(employee)
  }
}
