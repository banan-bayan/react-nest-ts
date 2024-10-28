import { Controller, Body, Get, Post, Delete, Param, UseGuards, ParseIntPipe, Res } from '@nestjs/common';
import { EmployeeTypeService } from './employee-type.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { EmployeeType } from './entities/employee-type.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';
import { Response } from 'express';

@ApiTags('Профессии')
@Controller('employee-type')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
export class EmployeeTypeController {
  constructor(private readonly employeeTypeService: EmployeeTypeService) {}

  @ApiOperation({ summary: 'Создать профессию' })
  @ApiResponse({ status: 201, type: EmployeeType, description: 'Профессия успешно создана' })
  @Post()
  async create(@Body() employeeTypeDto: CreateEmployeeTypeDto, @Res() res: Response) {
    
    await this.employeeTypeService.createEmployeeType(employeeTypeDto);
    
    return res.status(201).json({message: 'Профессия успешно создана'});

  }

  @ApiOperation({ summary: 'Получить все профессии' })
  @ApiResponse({ status: 200, type: [EmployeeType], description: 'Список профессий успешно получен' })
  @Get()
  async getAll() {

    return this.employeeTypeService.getAllEmployeeType();
  }

  @ApiOperation({ summary: 'Получить профессию' })
  @ApiResponse({ status: 200, type: EmployeeType, description: 'Профессия успешно получена' })
  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {

    return this.employeeTypeService.getEmployeeTypeById(id);
  }

  @ApiOperation({ summary: 'Удалить профессию' })
  @ApiResponse({ status: 204, description: 'Профессия успешно удалена' })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {

    await this.employeeTypeService.removeEmployeeType(id);

    return res.status(204).json({message: 'Профессия успешно удалена'});

  }
}
