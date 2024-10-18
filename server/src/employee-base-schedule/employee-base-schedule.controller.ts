import { Controller, Body, Get, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseSchedule } from './employee-base-schedule.model';
import { CreateEmployeeBaseScheduleDto } from './dto/create-employee-base-schedule.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Базовое расписание сотрудников')
@Controller('api/employee-base-schedule')
export class EmployeeBaseScheduleController {
  constructor(private readonly employeeBaseScheduleService: EmployeeBaseScheduleService) {}

  @ApiOperation({ summary: 'Создать базовое расписание сотрудника' })
  @ApiResponse({ status: 201, type: EmployeeBaseSchedule, description: 'Базовое расписание успешно создано' })
  @Post()
  create(@Body() employeeBaseScheduleDto: CreateEmployeeBaseScheduleDto) {
    return this.employeeBaseScheduleService.createEmployeeBaseSchedule(employeeBaseScheduleDto);
  }

  @ApiOperation({ summary: 'Получить все базовые расписания сотрудников' })
  @ApiResponse({ status: 200, type: [EmployeeBaseSchedule], description: 'Список базовых расписаний успешно получен' })
  @Get()
  getAll() {
    return this.employeeBaseScheduleService.getAllEmployeeBaseSchedule();
  }

  @ApiOperation({ summary: 'Получить базовое расписание сотрудника' })
  @ApiResponse({ status: 200, type: [EmployeeBaseSchedule], description: 'базовое расписание сотрудника успешно получено' })
  @Get('/:id')
  getAllEmployee(@Param('id') id: number) {
    return this.employeeBaseScheduleService.getEmployeeBaseSchedule(id);
  }


  @ApiOperation({ summary: 'Удалить базовое расписание сотрудника' })
  @ApiResponse({ status: 200, type: EmployeeBaseSchedule, description: 'базовое расписание сотрудника успешно удалено' })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.employeeBaseScheduleService.removeEmployeeBaseSchedule(id);
  }
}
