import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards, ParseIntPipe,
  Res
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { WorkRequestService } from './work-request.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkRequest } from './entities/work-request.entity';
import { CreateWorkRequestDto } from './dto/create-work-request.dto';
import { ERoles } from 'src/Types';
import { Response } from 'express';


@ApiTags('Заявки на работу')
@Controller('work-request')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) {}

  // @UseGuards(RolesGuard)
  // @Roles(ERoles.Admin, ERoles.User)
  @ApiOperation({ summary: 'Создание новой заявки' })
  @ApiResponse({ status: 201, type: WorkRequest, description: 'Заявка успешно создана' })
  @Post()
  async create(@Body() workRequestDto: CreateWorkRequestDto, @Res() res: Response) {

    await this.workRequestService.createWorkRequest(workRequestDto);

    return res.status(201).json({message: 'Заявка успешно создана'});

  }


  @ApiOperation({ summary: 'Получение всех заявок' })
  @ApiResponse({ status: 200, type: [WorkRequest], description: 'Список всех заявок успешно получены' })
  @Get()
  async getAll() {

    return this.workRequestService.getAllWorkRequests();
  }

  // @UseGuards(RolesGuard)
  // @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Получение заявки' })
  @ApiResponse({ status: 200, type: WorkRequest, description: 'Заявка успешно получена' })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {

    return this.workRequestService.getWorkRequest(id);
  }

  // @UseGuards(RolesGuard)
  // @Roles(ERoles.Admin, ERoles.User)
  @ApiOperation({ summary: 'Получение всех заявок пользователя' })
  @ApiResponse({ status: 200, type: [WorkRequest], description: 'Заявки пользователя успешно получены' })
  @Get('user/:userId')
  async getUserRequests(@Param('userId', ParseIntPipe) userId: number) {

    return this.workRequestService.getUserWorkRequests(userId);
  }

  // @UseGuards(RolesGuard)
  // @Roles(ERoles.Admin, ERoles.User)
  @ApiOperation({ summary: 'Отмена заявки пользователя' })
  @ApiResponse({ status: 200, type: WorkRequest, description: 'Заявка успешно отмена' })
  @Patch(':id')
  async cancel(@Param('id', ParseIntPipe) id: number) {

    return this.workRequestService.cancelWorkRequest(id);
  }

  // @UseGuards(RolesGuard)
  // @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Удаление заявки' })
  @ApiResponse({ status: 204, description: 'Заявка успешно удалена' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {

    await this.workRequestService.removeWorkRequest(id);

    return res.status(204).json({message: 'Заявка успешно удалена'});

  }
}

