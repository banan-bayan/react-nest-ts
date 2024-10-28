import { Controller, Body, Get, Post, Param, UseGuards, ParseIntPipe, Delete, Res } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/roles.entity';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';
import { Response } from 'express';

@ApiTags('Роли')
@Controller('roles')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание новой роли' })
  @ApiResponse({ status: 201, type: Role, description: 'Роль успешно создана' })
  @Post()
  async create(@Body() roleDto: CreateRoleDto, @Res() res: Response) {
    await this.rolesService.createRole(roleDto);

    return res.status(201).json({message: 'Роль успешно создана'});

  }

  @ApiOperation({ summary: 'Получение всех ролей' })
  @ApiResponse({ status: 200, type: [Role], description: 'Список ролей успешно получен' })
  @Get()
  async getAll() {
    
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получение роли по ID' })
  @ApiResponse({ status: 200, type: [Role], description: 'Роль успешно получена' })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe ) id: number) {

    return this.rolesService.getRoleById(id);
  }

  @ApiOperation({ summary: 'Получение роли по названию' })
  @ApiResponse({ status: 200, type: [Role], description: 'Роль успешно получена' })
  @Get('/role/:value')
  async getByValue(@Param('value') value: string) {

    return this.rolesService.getRoleByName(value);
  }

  @ApiOperation({ summary: 'Удаление роли' })
  @ApiResponse({ status: 204, type: [Role], description: 'Роль успешно удалена' })
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe ) id: number, @Res() res: Response) {

    await this.rolesService.removeRole(id);

    return res.status(204).json({message: 'Роль успешно удалена'});

  }
}
