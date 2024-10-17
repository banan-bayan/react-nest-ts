import { Injectable } from '@nestjs/common';
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
    await this.workRequestRepository.save(workRequest);
    
    return workRequest;
  }

  async getAllWorkRequests() {

    return await this.workRequestRepository.find();
  }

  async findWorkRequest(id: number) {
    const workRequest = await this.workRequestRepository.findOneBy({ id });
    if (!workRequest) {
      throw new Error(`Заявка с ID ${id} не найдена`);
    }

    return workRequest;
  }

  async findUserWorkRequests(id: number) {

    return await this.workRequestRepository.find({ where: { id } });
  }

  async updateWorkRequest(id: number, updateWorkRequestDto: UpdateWorkRequestDto) {
    const workRequest = await this.findWorkRequest(id);

    return await this.workRequestRepository.save({ ...workRequest, ...updateWorkRequestDto });
  }

  async cancelWorkRequest(id: number) {
    const workRequest = await this.findWorkRequest(id);
    workRequest.status = WorkRequestStatus.CANCELED;

    return await this.workRequestRepository.save(workRequest);
  }

  async removeWorkRequest(id: number) {
    const workRequest = await this.findWorkRequest(id);

    return await this.workRequestRepository.remove(workRequest);
  }
}
