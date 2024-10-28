import { Controller, Body, Get, Post, Param, Delete, UseGuards, ParseIntPipe, Res } from '@nestjs/common';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseSchedule } from './entities/employee-base-schedule.entity';
import { CreateEmployeeBaseScheduleDto } from './dto/create-employee-base-schedule.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';
import { Response } from 'express';

@ApiTags('Базовое расписание сотрудников')
@Controller('employee-base-schedule')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
export class EmployeeBaseScheduleController {
  constructor(private readonly employeeBaseScheduleService: EmployeeBaseScheduleService) {}


  @ApiOperation({ summary: 'Создать базовое расписание сотрудника' })
  @ApiResponse({ status: 201, type: EmployeeBaseSchedule, description: 'Базовое расписание успешно создано' })
  @Post()
  async create(@Body() employeeBaseScheduleDto: CreateEmployeeBaseScheduleDto, @Res() res: Response) {
    
    await this.employeeBaseScheduleService.createEmployeeBaseSchedule(employeeBaseScheduleDto);

    return res.status(201).json({message: 'Базовое расписание успешно создано'})
  }

  @ApiOperation({ summary: 'Получить все базовые расписания сотрудников' })
  @ApiResponse({ status: 200, type: [EmployeeBaseSchedule], description: 'Список базовых расписаний успешно получен' })
  @Get()
  async getAll() {

    return this.employeeBaseScheduleService.getAllEmployeeBaseSchedule();
  }

  @ApiOperation({ summary: 'Получить базовое расписание сотрудника' })
  @ApiResponse({ status: 200, type: [EmployeeBaseSchedule], description: 'Базовое расписание сотрудника успешно получено' })
  @Get('/:id')
  async getAllEmployee(@Param('id', ParseIntPipe) id: number) {

    return this.employeeBaseScheduleService.getEmployeeBaseSchedule(id);
  }

  @ApiOperation({ summary: 'Удалить базовое расписание сотрудника' })
  @ApiResponse({ status: 204, description: 'Базовое расписание сотрудника успешно удалено' })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {

    await this.employeeBaseScheduleService.removeEmployeeBaseSchedule(id);
    
    return res.status(204).json({message: 'Базовое расписание сотрудника успешно удалено'})
  }
}
