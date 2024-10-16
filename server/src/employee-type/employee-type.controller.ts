import { Controller, Body, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { EmployeeType } from './entities/employee-type.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Профессии')
@Controller('api/employee-type')
export class EmployeeTypeController {
  constructor(private readonly employeeTypeService: EmployeeTypeService) {}

    // @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Создать профессию' })
  @ApiResponse({ status: 201, type: EmployeeType, description: 'Профессия успешно создана' })
  @Post()
  create(@Body() employeeTypeDto: CreateEmployeeTypeDto) {
    
    return this.employeeTypeService.createEmployeeType(employeeTypeDto);
  }

  // @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Получить все профессии' })
  @ApiResponse({ status: 200, type: [EmployeeType], description: 'Список профессий успешно получен' })
  @Get()
  getAll() {

    return this.employeeTypeService.getAllEmployeeType();
  }

    // @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Получить профессию' })
  @ApiResponse({ status: 200, type: EmployeeType, description: 'Профессия успешно получена' })
  @Get('/:id')
  getOne(@Param('id') id: number) {

    return this.employeeTypeService.getEmployeeType(id);
  }

      // @UseGuards(RolesGuard)
    @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Удалить профессию' })
  @ApiResponse({ status: 200, type: EmployeeType, description: 'Профессия успешно удалена' })
  @Delete('/:id')
  delete(@Param('id') id: number) {

    return this.employeeTypeService.removeEmployeeType(id);
  }
}
