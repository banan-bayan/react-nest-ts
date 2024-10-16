import { Controller, Body, Get, Post } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { EmployeeType } from './entities/employee-type.entity';

@ApiTags('Профессии')
@Controller('api/employee-type')
export class EmployeeTypeController {
  constructor(private readonly employeeTypeService: EmployeeTypeService) {}

  @ApiOperation({ summary: 'Создать профессию' })
  @ApiResponse({ status: 201, type: EmployeeType, description: 'Профессия успешно создана' })
  @Post()
  create(@Body() employeeTypeDto: CreateEmployeeTypeDto) {
    return this.employeeTypeService.createEmployeeType(employeeTypeDto);
  }

  @ApiOperation({ summary: 'Получить все профессии' })
  @ApiResponse({ status: 200, type: [EmployeeType], description: 'Список профессий успешно получен' })
  @Get()
  getAll() {
    return this.employeeTypeService.getAllEmployeeType();
  }
}
