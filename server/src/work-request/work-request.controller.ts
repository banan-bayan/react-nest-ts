import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards, ParseIntPipe
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { WorkRequestService } from './work-request.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { ERoles } from 'src/Types';


@ApiTags('Заявки на работу')
@Controller('api/work-request')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) {}

  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin, ERoles.User)
  @ApiOperation({ summary: 'Создание новой заявки' })
  @ApiResponse({ status: 201, type: WorkRequest, description: 'Заявка успешно создана' })
  @Post()
  create(@Body() workRequestDto: CreateWorkRequestDto) {

    return this.workRequestService.createWorkRequest(workRequestDto);
  }


  @ApiOperation({ summary: 'Получение всех заявок' })
  @ApiResponse({ status: 200, type: [WorkRequest], description: 'Список всех заявок успешно получены' })
  @Get()
  getAll() {

    return this.workRequestService.getAllWorkRequests();
  }

  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Получение заявки' })
  @ApiResponse({ status: 200, type: WorkRequest, description: 'Заявка успешно получена' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {

    return this.workRequestService.getWorkRequest(id);
  }

  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin, ERoles.User)
  @ApiOperation({ summary: 'Получение всех заявок пользователя' })
  @ApiResponse({ status: 200, type: [WorkRequest], description: 'Заявки пользователя успешно получены' })
  @Get('user/:id')
  getUserRequests(@Param('id', ParseIntPipe) id: number) {

    return this.workRequestService.getUserWorkRequests(id);
  }

  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin, ERoles.User)
  @ApiOperation({ summary: 'Отмена заявки пользователя' })
  @ApiResponse({ status: 200, type: WorkRequest, description: 'Заявка успешно отмена' })
  @Patch(':id')
  cancel(@Param('id', ParseIntPipe) id: number) {

    return this.workRequestService.cancelWorkRequest(id);
  }

  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Удаление заявки' })
  @ApiResponse({ status: 204, description: 'Заявка успешно удалена' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {

    return this.workRequestService.removeWorkRequest(id);
  }
}

