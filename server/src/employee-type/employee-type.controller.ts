import { Controller, Body, Get, Post, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { EmployeeType } from './entities/employee-type.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Профессии')
@Controller('api/employee-type')
@UseGuards(RolesGuard)
@Roles(ERoles.Admin)
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

  @ApiOperation({ summary: 'Получить профессию' })
  @ApiResponse({ status: 200, type: EmployeeType, description: 'Профессия успешно получена' })
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {

    return this.employeeTypeService.getEmployeeType(id);
  }

  @ApiOperation({ summary: 'Удалить профессию' })
  @ApiResponse({ status: 204, description: 'Профессия успешно удалена' })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {

    return this.employeeTypeService.removeEmployeeType(id);
  }
}
