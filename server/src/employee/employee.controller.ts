import { Controller, Get, Post, Body, UseGuards, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmployeeService } from './employee.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Сотрудники')
@Controller('employee')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Создание сотрудника' })
  @ApiResponse({ status: 201, type: Employee, description: 'Сотрудник успешно создан' })
  @Post()
  async create(@Body() employeeDto: CreateEmployeeDto, @Res() res: Response) {
    await this.employeeService.createEmployee(employeeDto);
    
    return res.status(201).json({ message:  'Сотрудник успешно создан'});
  }

  @ApiOperation({ summary: 'Получение списка сотрудников' }) 
  @ApiResponse({ status: 200, type: [Employee], description: 'Список всех сотрудников успешно получен' })
  @Get()
  async getAll() {
    
    return this.employeeService.getAllEmployees();
  }
  
  @ApiOperation({ summary: 'Получение сотрудника' })
  @ApiResponse({ status: 200, type: Employee, description: 'Сотрудник успешно получен' })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {

    return this.employeeService.getEmployee(id)
  }

  @ApiOperation({ summary: 'Удаление сотрудника' })
  @ApiResponse({ status: 204, description: 'Сотрудник успешно удален' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.employeeService.deleteEmployee(id);

    return res.status(204).json({ message: 'Сотрудник успешно удален' });
  }
}
