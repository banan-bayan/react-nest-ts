import { Controller, Body, Get, Post } from '@nestjs/common';
import { WorkRequestService } from './work-request.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-request-work.dto';

@ApiTags('Заявки на работу')
@Controller('api/work-request')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) {}

  @ApiOperation({ summary: 'Создание новой заявки' })
  @ApiResponse({ status: 201, type: WorkRequest, description: 'Заявка успешно создана' })
  @Post()
  create(@Body() workRequestDto: CreateWorkRequestDto) {
    return this.workRequestService.createWorkRequest(workRequestDto);
  }

  @ApiOperation({ summary: 'Получение всех заявок' })
  @ApiResponse({ status: 200, type: [WorkRequest], description: 'Список всех заявок' })
  @Get()
  getAll() {
    return this.workRequestService.getAllWorkRequests();
  }
}
