import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { UpdateWorkRequestDto } from './dto/update-work-request.dto';
import { WorkRequestStatus } from 'src/Types';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';

@Injectable()
export class WorkRequestService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestRepository: Repository<WorkRequest>,
    @InjectRepository(EmployeeType)
    private employeeTypeRepository: Repository<EmployeeType>
  ) {}

  async createWorkRequest(dto: CreateWorkRequestDto) {
    const employees = await this.employeeTypeRepository.find({
      where: { id: In(dto.employeeWorkTypeIds) },
      relations: ['works'], // 'slot', 'user', 'employeeWorkType', 'userId' 'employeeType'  'works', 
    });
    
    console.log(employees, 'EMPLOOOOOOOYES')
    if (!employees.length) {
      throw new NotFoundException('Сотрудники с указанными типами работы не найдены');
    }

    const workRequest = this.workRequestRepository.create({
      ...dto,
      status: WorkRequestStatus.WAITING,
    });
    
    // return this.workRequestRepository.save(workRequest);
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

  async getUserWorkRequests(userId: number) {
    const workRequests = await this.workRequestRepository.find({ where: { userId } });

    if (!workRequests.length) {
      throw new NotFoundException(`Заявки пользователя с ID ${userId} не найдены`);
    }

    return workRequests;
  }

  async updateWorkRequest(id: number, updateWorkRequestDto: UpdateWorkRequestDto) {
    const workRequest = await this.getWorkRequest(id);

    return this.workRequestRepository.save({ ...workRequest, ...updateWorkRequestDto });
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
