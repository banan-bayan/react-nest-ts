import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { EmployeeBaseSchedule } from 'src/employee-base-schedule/entities/employee-base-schedule.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { User } from 'src/users/entities/users.entity';
import { EmployeeWorkType } from 'src/employee-work-type/entities/employee-work-type.entity';

import * as bcrypt from 'bcryptjs';
import e from 'express';

@Injectable()
export class DataSeedService {
  private readonly logger = new Logger(DataSeedService.name);

  constructor(
    @InjectRepository(Employee) private empRepository: Repository<Employee>,
    @InjectRepository(EmployeeType) private empTypeRepository: Repository<EmployeeType>,
    @InjectRepository(EmployeeBaseSchedule) private baseScheduleRepository: Repository<EmployeeBaseSchedule>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(EmployeeWorkType) private empWorkTypeRepository: Repository<EmployeeWorkType>
  ) {}

  async seed() {
    await this.seedEmployeeTypes();
    await this.seedEmployees();
    await this.seedRoles();
    await this.seedUsers();
    await this.seedEmployeeBaseSchedules();
    await this.seedEmployeeWorkType();
  }

  private async seedEmployeeTypes() {
    const typeCount = await this.empTypeRepository.count();
    if (typeCount > 0) return;

    const employeeTypes = [
      { title: 'Электрик' },
      { title: 'Техничка' },
      { title: 'Кухарка' },
    ];

    await this.empTypeRepository.save(employeeTypes);
    this.logger.log('Employee types seeded');
  }

  private async seedEmployees() {
    const employeeCount = await this.empRepository.count();
    if (employeeCount > 0) return;

    const employeeType1 = await this.empTypeRepository.findOneBy({
      title: 'Электрик',
    });
    const employeeType2 = await this.empTypeRepository.findOneBy({
      title: 'Техничка',
    });
    const employeeType3 = await this.empTypeRepository.findOneBy({
      title: 'Кухарка',
    });

    if (!employeeType1 || !employeeType2 || !employeeType3) {
      this.logger.error('One or more employee types not found');
      return;
    }

    const employees = [
      { name: 'Дмитрий Тарасов', type: employeeType1 },
      { name: 'Иван Важенин', type: employeeType1 },
      { name: 'Никита Воронин', type: employeeType2 },
      { name: 'Артем Кошкин', type: employeeType3 },
    ];

    await this.empRepository.save(employees);
    this.logger.log('Employees seeded');
  }

  private async seedUsers() {
    const userCount = await this.userRepository.count();
    if (userCount > 0) return;

    const adminRole = await this.roleRepository.findOneBy({description: 'Admin'});

    if (!adminRole) {
      this.logger.error('Admin role not found');
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash('password', salt);

    const users = [{
        name: 'Admin Admin',
        email: 'admin@mail.com',
        password: hashPassword,
        roles: [adminRole],
    }];

    await this.userRepository.save(users);
    this.logger.log('Users seeded');
  }

  private async seedRoles() {
    const roleCount = await this.roleRepository.count();
    if (roleCount > 0) return;

    const roles = [{ description: 'Admin' }, { description: 'User' }];

    await this.roleRepository.save(roles);
    this.logger.log('Roles seeded');
  }

  private async seedEmployeeBaseSchedules() {
    const scheduleCount = await this.baseScheduleRepository.count();
    if (scheduleCount > 0) return;

    const employees = await this.empRepository.find();

    const baseSchedules = employees.map((employee) => ({
      employee,
      start: new Date(new Date().setHours(9, 0, 0)),
      end: new Date(new Date().setHours(17, 0, 0)),
    }));

    await this.baseScheduleRepository.save(baseSchedules);
    this.logger.log('Base schedules seeded');
  }

  private async seedEmployeeWorkType() {
    const empWorkTypeCount = await this.empWorkTypeRepository.count();

    const employeeTypes = await this.empTypeRepository.find(); 

    if (empWorkTypeCount > 0) return;

    const empWorkTypes = [{
      title: 'Прикрутить розетку',
      price: 555,
      employeeType: [employeeTypes.find(type => type.title === 'Электрик')]
    },{
      title: 'Приготовить кексики',
      price: 1222,
      employeeType: [employeeTypes.find(type => type.title === 'Кухарка')],
    },{

      title: 'Помыть пол',
      price: 42,
      employeeType: [employeeTypes.find(type => type.title === 'Техничка')],
    },{
      title: 'Сварить воды',
      price: 10000,
      employeeType: [employeeTypes.find(type => type.title === 'Кухарка')]
    }]

    const validWorkTypes = empWorkTypes.filter(workType => workType.employeeType.length > 0);
    
    await this.empWorkTypeRepository.save(validWorkTypes);
    this.logger.log('Work types seeded');
  }
}
