import { Controller, Body, Get, Post, Param, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/roles.entity';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Роли')
@Controller('roles')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
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
