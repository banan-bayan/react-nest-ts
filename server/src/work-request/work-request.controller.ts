import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { WorkRequestService } from './work-request.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';


@ApiTags('Заявки на работу')
@Controller('api/work-request')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @ApiOperation({ summary: 'Создание новой заявки' })
  @ApiResponse({ status: 201, type: WorkRequest, description: 'Заявка успешно создана' })
  @Post()
  create(@Body() workRequestDto: CreateWorkRequestDto) {

    return this.workRequestService.createWorkRequest(workRequestDto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Получение всех заявок' })
  @ApiResponse({ status: 200, type: [WorkRequest], description: 'Список всех заявок' })
  @Get()
  getAll() {

    return this.workRequestService.getAllWorkRequests();
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Получение заявки' })
  @ApiResponse({ status: 200, type: WorkRequest, description: 'Заявка' })
  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.workRequestService.findWorkRequest(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @ApiOperation({ summary: 'Получение всех заявок пользователя' })
  @ApiResponse({ status: 200, type: [WorkRequest], description: 'Заявки пользователя' })
  @Get('user/:userId')
  findUserRequests(@Param('userId') userId: string) {

    return this.workRequestService.findUserWorkRequests(+userId);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin', 'User')
  @ApiOperation({ summary: 'Отмена заявки пользователя' })
  @ApiResponse({ status: 200, type: WorkRequest, description: 'Отмена пользователя' })
  @Patch(':id')
  cancel(@Param('id') id: string) {

    return this.workRequestService.cancelWorkRequest(+id);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @ApiOperation({ summary: 'Удаление заявки' })
  @ApiResponse({ status: 200, type: WorkRequest, description: 'Удаление заявки' })
  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.workRequestService.removeWorkRequest(+id);
  }
}

