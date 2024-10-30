import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeTypeService } from 'src/employee-type/employee-type.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private employeeType: EmployeeTypeService
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {

    const type = await this.employeeType.getEmployeeTypeById(dto.typeId);

    const employee = this.employeeRepository.create({ ...dto, type });

    return this.employeeRepository.save(employee);
  }
  

  async getAllEmployees() {
    const employees = await this.employeeRepository.find();

    return employees;
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findOne({where: {id}, relations: { slotSchedules: true }});

    if (!employee) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }

    return employee;
  }



  async deleteEmployee(id: number) {
     const employee = await this.getEmployeeById(id);
    
     return  this.employeeRepository.remove(employee)
  }
}
