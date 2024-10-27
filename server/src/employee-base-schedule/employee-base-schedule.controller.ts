import { Controller, Body, Get, Post, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EmployeeBaseScheduleService } from './employee-base-schedule.service';
import { EmployeeBaseSchedule } from './entities/employee-base-schedule.entity';
import { CreateEmployeeBaseScheduleDto } from './dto/create-employee-base-schedule.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Базовое расписание сотрудников')
@Controller('employee-base-schedule')
@UseGuards(RolesGuard)
@Roles(ERoles.Admin)
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
  @ApiResponse({ status: 200, type: [EmployeeBaseSchedule], description: 'Базовое расписание сотрудника успешно получено' })
  @Get('/:id')
  getAllEmployee(@Param('id', ParseIntPipe) id: number) {

    return this.employeeBaseScheduleService.getEmployeeBaseSchedule(id);
  }

  @ApiOperation({ summary: 'Удалить базовое расписание сотрудника' })
  @ApiResponse({ status: 204, description: 'Базовое расписание сотрудника успешно удалено' })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {

    return this.employeeBaseScheduleService.removeEmployeeBaseSchedule(id);
  }
}
