import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { UpdateWorkRequestDto } from './dto/update-work-request.dto';
import { WorkRequestStatus } from 'src/Types';
import { EmployeeTypeService } from 'src/employee-type/employee-type.service';
import { UsersService } from 'src/users/users.service';
import { EmployeeSlotSchedule } from 'src/employee-slot-schedule/entities/employee-slot-schedule.entity';
import { EmployeeSlotScheduleService } from 'src/employee-slot-schedule/employee-slot-schedule.service';

@Injectable()
export class WorkRequestService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestRepository: Repository<WorkRequest>,
    private employeeTypeService: EmployeeTypeService,
    private userService: UsersService,
    private slotService: EmployeeSlotScheduleService,
  ) {}

  async createWorkRequest(dto: CreateWorkRequestDto) {
    const { startDate: startDateWorkRequest, employeeWorkTypeIds } = dto;

    const employees = await this.employeeTypeService.getEmployeesTypeByIdes(employeeWorkTypeIds);
    
    console.log(employees)

    const employee = employees[0];
    console.log(employee)

    const employeeSlots = await this.slotService.getEmployeeSlotsSchedules(employee.id);

    const existSlot = employeeSlots.find(
      ({ startDate }) => new Date(startDate).getTime() === new Date(startDateWorkRequest).getTime());

    if (existSlot) {
      throw new NotFoundException('Слот уже занят');
    }

 

    const workRequest = this.workRequestRepository.create({
      ...dto,
      status: WorkRequestStatus.WAITING,
    });

    return this.workRequestRepository.save(workRequest);
  }

  async getAllWorkRequests() {
    return this.workRequestRepository.find();
  }

  async getWorkRequest(id: number) {
    const workRequest = await this.workRequestRepository.findOneBy({ id });

    if (!workRequest) {
      throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    }

    return workRequest;
  }

  async getUserWorkRequests(id: number) {
   
    return this.userService.getWorkRequestsByUserId(id);
  }

  async updateWorkRequest(
    id: number,
    updateWorkRequestDto: UpdateWorkRequestDto,
  ) {
    const workRequest = await this.getWorkRequest(id);

    return this.workRequestRepository.save({
      ...workRequest,
      ...updateWorkRequestDto,
    });
  }

  async cancelWorkRequest(id: number) {
    const workRequest = await this.getWorkRequest(id);
    workRequest.status = WorkRequestStatus.CANCELED;

    return this.workRequestRepository.save(workRequest);
  }

  async removeWorkRequest(id: number) {
    const workRequest = await this.getWorkRequest(id);

    return this.workRequestRepository.remove(workRequest);
  }
}
