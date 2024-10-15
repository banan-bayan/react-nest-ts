import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EmployeeWorkType } from 'src/employee-work-type/employee-work-type.model';

@Entity({ name: 'employee_types'})
export class EmployeeType {
  @ApiProperty({ example: 1, description: 'Идентификатор типа сотрудника' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Электрик', description: 'Профессия специалиста' })
  @Column({ type: 'varchar', unique: true })
  title: string;

  @OneToMany(() => EmployeeWorkType, (workType) => workType.employeeType)
  works: EmployeeWorkType[];
}
