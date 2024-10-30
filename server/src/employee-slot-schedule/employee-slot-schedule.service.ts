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

  async getEmployeeSlotsSchedulesByEmployeeId(employeeId: number) {
    const employeeSlotsSchedules = await this.employeeSlotScheduleRepository.find({
      where: { employee: { id: employeeId } }
    });
  
    if (!employeeSlotsSchedules.length) {
      throw new NotFoundException(`Слоты сотрудника с ID ${employeeId} не найдены`);
    }
  
    return employeeSlotsSchedules;
  }

  async getEmployeeSlotSchedulesById(id: number) {
    const employeeSlotSchedules =
      await this.employeeSlotScheduleRepository.findOneBy({ id });

    if (!employeeSlotSchedules) {
      throw new NotFoundException(`Слот с ID ${id} не найден`);
    }

    return employeeSlotSchedules;
  }

  // async getEmployeesSlotsSchedules(ids: number[]) {
  //   const employeesSlotsSchedules = await this.employeeSlotScheduleRepository.find({
  //     where: { employee: In(ids) },
  //     relations: { employee: true },
  //   });
  
  //   if (!employeesSlotsSchedules.length) {
  //     throw new NotFoundException(`Слоты сотрудников с ID ${ids.join(', ')} не найдены`);
  //   }
  
  //   return employeesSlotsSchedules;
  // }



  async removeEmployeeSlotSchedules(id: number) {
    const employeeSlotSchedules = await this.getEmployeeSlotSchedulesById(id);
    await this.employeeSlotScheduleRepository.remove(employeeSlotSchedules);

    return { message: 'Временной слот сотрудника успешно удален' };
  }
  
}
