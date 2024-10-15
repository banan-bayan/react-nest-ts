import { Controller, Post, Get, Body } from '@nestjs/common';
import { EmployeeWorkTypeService } from './employee-work-type.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeWorkTypeDto } from './dto/create-employee-work-type.dto';
import { EmployeeWorkType } from './employee-work-type.model';

@ApiTags('Типы работ сотрудников')
@Controller('api/employee-work-type')
export class EmployeeWorkTypeController {
  constructor(private readonly employeeWorkTypeService: EmployeeWorkTypeService) {}

  @ApiOperation({ summary: 'Создать новый тип работ' })
  @ApiResponse({ status: 201, type: EmployeeWorkType, description: 'Тип работ успешно создан' })
  @Post()
  create(@Body() employeeWorkTypeDto: CreateEmployeeWorkTypeDto) {
    return this.employeeWorkTypeService.createEmployeeWorkType(employeeWorkTypeDto);
  }

  @ApiOperation({ summary: 'Получить все типы работ' })
  @ApiResponse({ status: 200, type: [EmployeeWorkType], description: 'Список типов работ успешно получен' })
  @Get()
  getAll() {
    return this.employeeWorkTypeService.getAllEmployeeWorkType();
  }
}
