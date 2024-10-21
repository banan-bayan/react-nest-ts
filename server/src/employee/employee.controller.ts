import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Сотрудники')
@Controller('api/employee')
@UseGuards(RolesGuard)
@Roles(ERoles.Admin)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Создание сотрудника' })
  @ApiResponse({ status: 201, type: Employee, description: 'Сотрудник успешно создан' })
  @Post()
  create(@Body() employeeDto: CreateEmployeeDto) {

    return this.employeeService.createEmployee(employeeDto);
  }

  @ApiOperation({ summary: 'Получение списка сотрудников' }) 
  @ApiResponse({ status: 200, type: [Employee], description: 'Список всех сотрудников успешно получен' })
  @Get()
  getAll() {
    
    return this.employeeService.getAllEmployees();
  }
  
  @ApiOperation({ summary: 'Получение сотрудника' })
  @ApiResponse({ status: 200, type: Employee, description: 'Сотрудник успешно получен' })
  @Get(':id')
  getOne(@Param() id: number) {

    return this.employeeService.getEmployee(id)
  }

  @ApiOperation({ summary: 'Удаление сотрудника' })
  @ApiResponse({ status: 200, type: Employee, description: 'Сотрудник успешно удален' })
  @Delete(':id')
  delete(@Param() id: number) {

    return this.employeeService.deleteEmployee(id)
  }
}
