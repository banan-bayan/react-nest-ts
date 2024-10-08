import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeSlotSchedule } from './employee-slot-schedule.model';
import { CreateEmployeeSlotScheduleDto } from './dto/create-employee-slot-schedule.dto';
@Injectable()
export class EmployeeSlotScheduleService {
  constructor(@InjectRepository(EmployeeSlotSchedule)
   private employeeSlotScheduleRepository: Repository<EmployeeSlotSchedule>) {}

   async createEmployeeSlotSchedule(dto: CreateEmployeeSlotScheduleDto) {
     const employeeSlotSchedule = await this.employeeSlotScheduleRepository.create(dto)

     return employeeSlotSchedule;
   }

   async getAllEmployeeSlotSchedules() {

    const employeeSlotSchedules = this.employeeSlotScheduleRepository.find()

    return employeeSlotSchedules;
   }
}
