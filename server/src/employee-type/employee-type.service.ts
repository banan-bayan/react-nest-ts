import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeType } from './entities/employee-type.entity';
import { Repository, In } from 'typeorm';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { EmployeeWorkTypeService } from 'src/employee-work-type/employee-work-type.service';

@Injectable()
export class EmployeeTypeService {
  constructor(
    @InjectRepository(EmployeeType)
     private readonly employeeTypeRepository: Repository<EmployeeType>,
     private employeeWorkTypeService: EmployeeWorkTypeService
  ) {}

  async createEmployeeType(dto: CreateEmployeeTypeDto): Promise<EmployeeType> {
    const employeeType = this.employeeTypeRepository.create(dto);

    const employeeWorkType = await this.employeeWorkTypeService.getEmployeeWorkTypeById(dto.workTypeId);

    return this.employeeTypeRepository.save({ ...employeeType, employeeWorkType });
  }

  async getAllEmployeeType(): Promise<EmployeeType[]> {

    return this.employeeTypeRepository.find();
  }

  async getEmployeeTypeById(id: number): Promise<EmployeeType> {
    const employeeType = await this.employeeTypeRepository.findOneBy({ id });

    if (!employeeType) {
      throw new NotFoundException(`Профессия с ID ${id} не найдена`);
    }

    return employeeType;
  }

  async removeEmployeeType(id: number): Promise<EmployeeType> {
    const employeeType = await this.getEmployeeTypeById(id);

    return this.employeeTypeRepository.remove(employeeType);
  }


  async getEmployeesTypeByIdes(ides: number[]) {
   
    const employees = await this.employeeTypeRepository.find({
      where: { id: In(ides) },
      relations: { employee: true },
    });

    if (!employees.length) {
      throw new NotFoundException('Сотрудники с указанными типами работы не найдены');
    }

    return employees;
  }
}
