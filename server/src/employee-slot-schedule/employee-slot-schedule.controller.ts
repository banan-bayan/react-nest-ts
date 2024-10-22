import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';
import { CreateEmployeeSlotScheduleDto } from './dto/create-employee-slot-schedule.dto';
import { EmployeeSlotSchedule } from './entities/employee-slot-schedule.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Временной слот сотрудника')
@Controller('api/employee-slot-schedule')
@UseGuards(RolesGuard)
@Roles(ERoles.Admin)
export class EmployeeSlotScheduleController {
  constructor(private readonly employeeSlotScheduleService: EmployeeSlotScheduleService) {}

  @ApiOperation({ summary: 'Создать временной слот сотрудника' })
  @ApiResponse({ status: 201, type: EmployeeSlotSchedule, description: 'Временной слот успешно создан' })
  @Post()
  create(@Body() employeeSlotScheduleDto: CreateEmployeeSlotScheduleDto) {

    return this.employeeSlotScheduleService.createEmployeeSlotSchedule(employeeSlotScheduleDto);
  }

  @ApiOperation({ summary: 'Получить все временные слоты сотрудников' })
  @ApiResponse({ status: 200, type: [EmployeeSlotSchedule], description: 'Временные слоты всех сотрудников успешно получены' })
  @Get()
  getAll() {

    return this.employeeSlotScheduleService.getAllEmployeeSlotSchedules();
  }

  @ApiOperation({ summary: 'Получить все временные слоты сотрудника' })
  @ApiResponse({ status: 200, type: [EmployeeSlotSchedule], description: 'Временные слоты сотрудника успешно получены' })
  @Get('/:id')
  getAllEmployee(@Param('id', ParseIntPipe) id: number) {

    return this.employeeSlotScheduleService.getEmployeeSlotsSchedules(id);
  }

  @ApiOperation({ summary: 'Получить временной слот сотрудника' })
  @ApiResponse({ status: 200, type: EmployeeSlotSchedule, description: 'Временной слот сотрудника успешно получен' })
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {

    return this.employeeSlotScheduleService.getEmployeeSlotSchedules(id);
  }

  @ApiOperation({ summary: 'Удалить временной слот сотрудника' })
  @ApiResponse({ status: 204, description: 'Временной слот сотрудника успешно удален' })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {

    return this.employeeSlotScheduleService.removeEmployeeSlotSchedules(id);
  }
}
