import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeSlotSchedule } from './employee-slot-schedule.model';
import { CreateEmployeeSlotScheduleDto } from './dto/create-employee-slot-schedule.dto';
@Injectable()
export class EmployeeSlotScheduleService {
  constructor(
    @InjectRepository(EmployeeSlotSchedule)
    private employeeSlotScheduleRepository: Repository<EmployeeSlotSchedule>,
  ) {}

  async createEmployeeSlotSchedule(dto: CreateEmployeeSlotScheduleDto) {
    const employeeSlotSchedule =
      this.employeeSlotScheduleRepository.create(dto);

    return employeeSlotSchedule;
  }

  async getAllEmployeeSlotSchedules() {
    const employeeSlotSchedules = this.employeeSlotScheduleRepository.find();

    return employeeSlotSchedules;
  }

  async getEmployeeSlotsSchedules(id: number) {
    const employeeSlotsSchedules =
      await this.employeeSlotScheduleRepository.findBy({ id });

    if (!employeeSlotsSchedules) {
      throw new Error(`Слоты сотрудника с ID ${id} не найдены`);
    }

    return employeeSlotsSchedules;
  }

  async getEmployeeSlotSchedules(id: number) {
    const employeeSlotSchedules =
      await this.employeeSlotScheduleRepository.findOneBy({ id });

    if (!employeeSlotSchedules) {
      throw new Error(`Слот с ID ${id} не найден`);
    }

    return employeeSlotSchedules;
  }

  async removeEmployeeSlotSchedules(id: number) {
    const employeeSlotSchedules = await this.getEmployeeSlotSchedules(id);

    return await this.employeeSlotScheduleRepository.delete(
      employeeSlotSchedules,
    );
  }
}
