import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeBaseSchedule } from './entities/employee-base-schedule.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeBaseScheduleDto } from './dto/create-employee-base-schedule.dto';

@Injectable()
export class EmployeeBaseScheduleService {
  constructor(
    @InjectRepository(EmployeeBaseSchedule)
    private employeeBaseScheduleRepository: Repository<EmployeeBaseSchedule>,
  ) {}

  async createEmployeeBaseSchedule(dto: CreateEmployeeBaseScheduleDto) {
    const employeeBaseSchedule = this.employeeBaseScheduleRepository.create(dto);
    await this.employeeBaseScheduleRepository.save(employeeBaseSchedule);

    return employeeBaseSchedule;
  }
  
  async getAllEmployeeBaseSchedule() {
    const employeeBaseSchedules =
      await this.employeeBaseScheduleRepository.find();

    return employeeBaseSchedules;
  }

  async getEmployeeBaseSchedule(id: number) {
    const employeeBaseSchedule = await this.employeeBaseScheduleRepository.findOneBy({ id });

    if (!employeeBaseSchedule) {
      throw new NotFoundException(`Расписание сотрудника с ID ${id} не найдено`);
    }

    return employeeBaseSchedule;
  }



  async removeEmployeeBaseSchedule(id: number) {
    const employeeBaseSchedule = await this.getEmployeeBaseSchedule(id);
    await this.employeeBaseScheduleRepository.remove(employeeBaseSchedule);

    return { message: 'Базовое расписание сотрудника успешно удалено' };
  }
  
}
