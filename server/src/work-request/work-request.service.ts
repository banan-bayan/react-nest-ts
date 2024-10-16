import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-request-work.dto';

@Injectable()
export class WorkRequestService {
  constructor(@InjectRepository(WorkRequest) private workRequestRepository: Repository<WorkRequest>) {}

  async createWorkRequest(dto: CreateWorkRequestDto) {
    const workRequest = await this.workRequestRepository.create(dto);

    return workRequest;
  }

  async getAllWorkRequests() {
    const workRequests = await this.workRequestRepository.find();

    return workRequests;
  }
}
