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
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeWorkTypeService } from 'src/employee-work-type/employee-work-type.service';

@Injectable()
export class WorkRequestService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestRepository: Repository<WorkRequest>,
    private empTypeService: EmployeeTypeService,
    private userService: UsersService,
    private slotService: EmployeeSlotScheduleService,
    private empService: EmployeeService,
    private empWorkTypeService: EmployeeWorkTypeService
  ) {}

  async createWorkRequest(dto: CreateWorkRequestDto) {
    try {
    const { startDate: startDateWorkRequest, employeeWorkTypeIds, endDate, employeeId = null, userId } = dto;

    if (employeeId) {
      const employee = await this.empService.getEmployeeById(employeeId);
      const existSlot = employee.slotSchedules.find(({ startDate }) => {

        return new Date(startDate).getTime() === new Date(startDateWorkRequest).getTime();
      });
 
      if (existSlot) {
        throw new NotFoundException('Слот уже занят');
      }
      // создаю заявку, но так же нужно обновить другие таблицы, такие как empSlot, 
      const user = await this.userService.getUserById(userId);
      const slot = await this.slotService.createEmployeeSlotSchedule({ startDate: startDateWorkRequest, endDate, employeeId });
      console.log(slot.id, '=====SLOT=====')
      const employeeWorkTypes = await this.empWorkTypeService.getEmployeeWorkTypesByIds(employeeWorkTypeIds);

      const workRequest = this.workRequestRepository.create({
        id: 422,
        user,
        slot,
        employeeWorkType: employeeWorkTypes,
        status: WorkRequestStatus.WAITING,
      });
      // console.log(workRequest, '+++ WORK REQUEST')
 


      return await this.workRequestRepository.save(workRequest);
    } else {

    }
  } catch(e) {
      console.log(e, 'JAGA-----')
    }
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
    const user = await this.userService.getWorkRequestsByUserId(id);
    
    return user[0].workRequest;
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
