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

@Injectable()
export class WorkRequestService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestRepository: Repository<WorkRequest>,
    private employeeTypeService: EmployeeTypeService,
    private userService: UsersService,
    private slotService: EmployeeSlotScheduleService,
    private employeeService: EmployeeService
  ) {}

  async createWorkRequest(dto: CreateWorkRequestDto) {
    const { startDate: startDateWorkRequest, employeeWorkTypeIds, endDate, employeeId = null, userId } = dto;

    if (employeeId) {
      const employee = await this.employeeService.getEmployeeById(employeeId);
      const existSlot = employee[0].slotSchedules.find(({ startDate }) => {

        return new Date(startDate).getTime() === new Date(startDateWorkRequest).getTime();
      });

      if (existSlot) {
        throw new NotFoundException('Слот уже занят');
      }
      // создаю заявку, но так же нужно обновить другие таблицы, такие как empSlot, 
      const user = await this.userService.getUserById(userId);
      const slot =  { startDate: startDateWorkRequest, endDate, employeeId };
      const employeeWorkType = ['employeeWorkType']
      const workRequest = this.workRequestRepository.create({
        ...dto,
        user,
        slot,
        // employeeWorkType,
        status: WorkRequestStatus.WAITING,
      });

 

      // await this.slotService.createEmployeeSlotSchedule(slotDto);

      return this.workRequestRepository.save(workRequest);

    } else {
      const employees =
        await this.employeeTypeService.getEmployeesTypeByIdes(
          employeeWorkTypeIds,
        ); // достал типы выбранные пользователем, вместе с сотрудниками

      console.log(employees, 'EMPS difference TYPEs choose user');
      
      // а пользователь может выбирать только один слот времени, на разные типы работ и на разных специалистов ?
      // const  map = employees.map(async ({ id }) => {
      //   const employeeSlots = await this.slotService.getEmployeesSlotsSchedules(id);

      //   const existSlot = employeeSlots.find(({ startDate }) => {
      //     new Date(startDate).getTime() === new Date(startDateWorkRequest).getTime()
      //   });

      //   if (existSlot) {
      //     throw new NotFoundException('Слот уже занят');
      //   }

      //   // тут привязка к работнику + User ID, и обновить слоты
      //   const workRequest = this.workRequestRepository.create({
      //     ...dto,
      //     status: WorkRequestStatus.WAITING,
      //   });
  
      //   // return this.workRequestRepository.save(workRequest);

      // });


      // const employee = employees[0];
      // console.log(employee);

      // const employeeSlots = await this.slotService.getEmployeeSlotsSchedules(
      //   employee.id,
      // );

      // const existSlot = employeeSlots.find(
      //   ({ startDate }) =>
      //     new Date(startDate).getTime() ===
      //     new Date(startDateWorkRequest).getTime(),
      // );

      // if (existSlot) {
      //   throw new NotFoundException('Слот уже занят');
      // }

      // const workRequest = this.workRequestRepository.create({
      //   ...dto,
      //   status: WorkRequestStatus.WAITING,
      // });

      // return this.workRequestRepository.save(workRequest);
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
