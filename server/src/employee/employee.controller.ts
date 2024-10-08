import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.model';

@ApiTags('Сотрудники')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Создание сотрудника' })
  @ApiResponse({ status: 201, type: Employee, description: 'Сотрудник успешно создан' })
  @Post()
  create(@Body() employeeDto: CreateEmployeeDto) {

    return this.employeeService.createEmployee(employeeDto);
  }

  @ApiOperation({ summary: 'Получение списка сотрудников' }) 
  @ApiResponse({ status: 200, type: [Employee], description: 'Список всех сотрудников' })
  @Get()
  getAll() {
    
    return this.employeeService.getAllEmployees();
  }
  
}
