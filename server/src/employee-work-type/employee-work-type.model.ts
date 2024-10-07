import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmployeeType } from 'src/employee-type/employee-type.model';

@Entity({ name: 'employee_work_types' })
export class EmployeeWorkType {
  @ApiProperty({ example: 1, description: 'Идентификатор типа работы' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Прикрутить розетку', description: 'Описание услуги' })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ example: 555, description: 'Цена услуги' })
  @Column({ type: 'float' })
  price: number;

  @ApiProperty({ description: 'Тип сотрудника, связанный с данной услугой' })
  @ManyToOne(() => EmployeeType, (employeeType) => employeeType.works)
  employeeType: EmployeeType;
}
