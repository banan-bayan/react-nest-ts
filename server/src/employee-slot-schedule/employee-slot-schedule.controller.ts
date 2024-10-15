import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';
import { CreateEmployeeSlotScheduleDto } from './dto/create-employee-slot-schedule.dto';
import { EmployeeSlotSchedule } from './employee-slot-schedule.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Временной слот сотрудника')
@Controller('api/employee-slot-schedule')
export class EmployeeSlotScheduleController {
  constructor(private readonly employeeSlotScheduleService: EmployeeSlotScheduleService) {}

  @ApiOperation({ summary: 'Создать временной слот сотрудника' })
  @ApiResponse({ status: 201, type: EmployeeSlotSchedule })
  @Post()
  create(@Body() employeeSlotScheduleDto: CreateEmployeeSlotScheduleDto) {
    return this.employeeSlotScheduleService.createEmployeeSlotSchedule(employeeSlotScheduleDto);
  }

  @ApiOperation({ summary: 'Получить все временные слоты сотрудников' })
  @ApiResponse({ status: 200, type: [EmployeeSlotSchedule] })
  @Get()
  getAll() {
    return this.employeeSlotScheduleService.getAllEmployeeSlotSchedules();
  }
}
