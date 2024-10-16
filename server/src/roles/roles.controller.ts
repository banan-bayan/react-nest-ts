import { Controller, Body, Get, Post, Param } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/roles.entity';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание новой роли' })
  @ApiResponse({ status: 201, type: Role, description: 'Роль успешно создана' })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получение всех ролей' })
  @ApiResponse({ status: 200, type: [Role], description: 'Список ролей успешно получен' })
  @Get()
  getAll() {
    
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получение роли' })
  @ApiResponse({ status: 200, type: [Role], description: 'Роль успешно получена' })
  @Get('/:value')
  getByValue(@Param('value') value: string) {

    return this.rolesService.getRoleByName(value);
  }
}
