import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { UpdateWorkRequestDto } from './dto/update-work-request.dto';
import { WorkRequestStatus } from 'src/Types';

@Injectable()
export class WorkRequestService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestRepository: Repository<WorkRequest>,
  ) {}

  async createWorkRequest(dto: CreateWorkRequestDto) {
    const workRequest = this.workRequestRepository.create(dto);
    
    return  this.workRequestRepository.save(workRequest);
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
    const workRequests = await this.workRequestRepository.find({ where: { id } });

    if (!workRequests.length) {
      throw new NotFoundException(`Заявки пользователя с ID ${id} не найдены`);
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
