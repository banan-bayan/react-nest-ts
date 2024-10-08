import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeBaseSchedule } from './employee-base-schedule.model';
import { Repository } from 'typeorm';
import { CreateEmployeeBaseScheduleDto } from './dto/create-employee-base-schedule.dto';

@Injectable()
export class EmployeeBaseScheduleService {
  constructor(
    @InjectRepository(EmployeeBaseSchedule)
    private employeeBaseScheduleRepository: Repository<EmployeeBaseSchedule>,
  ) {}

  async createEmployeeBaseSchedule(dto: CreateEmployeeBaseScheduleDto) {
    const employeeBaseSchedule =
      await this.employeeBaseScheduleRepository.create(dto);

    return employeeBaseSchedule;
  }

  async getAllEmployeeBaseSchedule() {
    const employeeBaseSchedules =
      await this.employeeBaseScheduleRepository.find();

    return employeeBaseSchedules;
  }
}
