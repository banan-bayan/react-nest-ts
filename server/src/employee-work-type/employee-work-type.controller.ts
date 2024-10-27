import { Controller, Post, Get, Body, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EmployeeWorkTypeService } from './employee-work-type.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeWorkTypeDto } from './dto/create-employee-work-type.dto';
import { EmployeeWorkType } from './entities/employee-work-type.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Типы работ сотрудников')
@Controller('employee-work-type')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
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

  @ApiOperation({ summary: 'Получить тип работ' })
  @ApiResponse({ status: 200, type: EmployeeWorkType, description: 'Тип работ успешно получен' })
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {

    return this.employeeWorkTypeService.getEmployeeWorkType(id);
  }

  @ApiOperation({ summary: 'Удалить тип работ' })
  @ApiResponse({ status: 204, description: 'Тип работ успешно удалён' })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {

    return this.employeeWorkTypeService.removeEmployeeWorkType(id);
  }
}
