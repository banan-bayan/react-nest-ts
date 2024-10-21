import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeSlotSchedule } from './entities/employee-slot-schedule.entity';
import { CreateEmployeeSlotScheduleDto } from './dto/create-employee-slot-schedule.dto';
@Injectable()
export class EmployeeSlotScheduleService {
  constructor(
    @InjectRepository(EmployeeSlotSchedule)
    private employeeSlotScheduleRepository: Repository<EmployeeSlotSchedule>,
  ) {}

  async createEmployeeSlotSchedule(dto: CreateEmployeeSlotScheduleDto) {
    const employeeSlotSchedule = this.employeeSlotScheduleRepository.create(dto);
    await this.employeeSlotScheduleRepository.save(employeeSlotSchedule);

    return employeeSlotSchedule;
  }
  

  async getAllEmployeeSlotSchedules() {
    const employeeSlotSchedules = this.employeeSlotScheduleRepository.find();

    return employeeSlotSchedules;
  }

  async getEmployeeSlotsSchedules(id: number) {
    const employeeSlotsSchedules =
      await this.employeeSlotScheduleRepository.findBy({ id });

    if (!employeeSlotsSchedules.length) {
      throw new NotFoundException(`Слоты сотрудника с ID ${id} не найдены`);
    }

    return employeeSlotsSchedules;
  }

  async getEmployeeSlotSchedules(id: number) {
    const employeeSlotSchedules =
      await this.employeeSlotScheduleRepository.findOneBy({ id });

    if (!employeeSlotSchedules) {
      throw new NotFoundException(`Слот с ID ${id} не найден`);
    }

    return employeeSlotSchedules;
  }

  async removeEmployeeSlotSchedules(id: number) {
    const employeeSlotSchedules = await this.getEmployeeSlotSchedules(id);
    await this.employeeSlotScheduleRepository.remove(employeeSlotSchedules);

    return { message: 'Временной слот сотрудника успешно удален' };
  }
  
}
