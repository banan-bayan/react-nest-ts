import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Res } from '@nestjs/common';
import { EmployeeSlotScheduleService } from './employee-slot-schedule.service';
import { CreateEmployeeSlotScheduleDto } from './dto/create-employee-slot-schedule.dto';
import { EmployeeSlotSchedule } from './entities/employee-slot-schedule.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';
import { Response } from 'express';

@ApiTags('Временной слот сотрудника')
@Controller('employee-slot-schedule')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
export class EmployeeSlotScheduleController {
  constructor(private readonly employeeSlotScheduleService: EmployeeSlotScheduleService) {}

  @ApiOperation({ summary: 'Создать временной слот сотрудника' })
  @ApiResponse({ status: 201, type: EmployeeSlotSchedule, description: 'Временной слот успешно создан' })
  @Post()
  async create(@Body() employeeSlotScheduleDto: CreateEmployeeSlotScheduleDto, @Res() res: Response) {

    await this.employeeSlotScheduleService.createEmployeeSlotSchedule(employeeSlotScheduleDto);

    return res.status(201).json({message: 'Временной слот успешно создан'});

  }

  @ApiOperation({ summary: 'Получить все временные слоты сотрудников' })
  @ApiResponse({ status: 200, type: [EmployeeSlotSchedule], description: 'Временные слоты всех сотрудников успешно получены' })
  @Get()
  async getAll() {

    return this.employeeSlotScheduleService.getAllEmployeeSlotSchedules();
  }

  @ApiOperation({ summary: 'Получить все временные слоты сотрудника' })
  @ApiResponse({ status: 200, type: [EmployeeSlotSchedule], description: 'Временные слоты сотрудника успешно получены' })
  @Get('/:id')
  async getAllEmployee(@Param('id', ParseIntPipe) id: number) {

    return this.employeeSlotScheduleService.getEmployeeSlotsSchedules(id);
  }

  @ApiOperation({ summary: 'Получить временной слот сотрудника' })
  @ApiResponse({ status: 200, type: EmployeeSlotSchedule, description: 'Временной слот сотрудника успешно получен' })
  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {

    return this.employeeSlotScheduleService.getEmployeeSlotSchedules(id);
  }

  @ApiOperation({ summary: 'Удалить временной слот сотрудника' })
  @ApiResponse({ status: 204, description: 'Временной слот сотрудника успешно удален' })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {

    await this.employeeSlotScheduleService.removeEmployeeSlotSchedules(id)

    return res.status(204).json({message: 'Временной слот сотрудника успешно удален'})
  }
}
