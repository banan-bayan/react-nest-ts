import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EmployeeSlotSchedule } from './entities/employee-slot-schedule.entity';
import { CreateEmployeeSlotScheduleDto } from './dto/create-employee-slot-schedule.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class EmployeeSlotScheduleService {
  constructor(
    @InjectRepository(EmployeeSlotSchedule)
    private employeeSlotScheduleRepository: Repository<EmployeeSlotSchedule>,
    private employeeService: EmployeeService
  ) {}

  async createEmployeeSlotSchedule(dto: CreateEmployeeSlotScheduleDto): Promise<EmployeeSlotSchedule> {
    const employeeSlotSchedule = this.employeeSlotScheduleRepository.create(dto);
  
    const employee = await this.employeeService.getEmployeeById(dto.employeeId);
  
    await this.employeeSlotScheduleRepository.save({...employeeSlotSchedule, employee});
  
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

  async getEmployeesSlotsSchedules(ids: number[]) {
    const employeesSlotsSchedules = await this.employeeSlotScheduleRepository.find({
      // where: { employeeId: In(ids) } // как найти слоты
    });
  
    if (!employeesSlotsSchedules.length) {
      throw new NotFoundException(`Слоты сотрудников с ID ${ids.join(', ')} не найдены`);
    }
  
    return employeesSlotsSchedules;
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
