import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { EmployeeType } from 'src/employee-type/employee-type.model';
import { EmployeeSlotSchedule } from 'src/employee-slot-schedule/employee-slot-schedule.model';

@Entity({ name: 'employees' })
export class Employee {
  
  @ApiProperty({ example: 1, description: 'Идентификатор сотрудника' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Путин Владимир Владимирович', description: 'ФИО сотрудника' })
  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => EmployeeType, (employeeType) => employeeType.works)
  type: EmployeeType;

  @OneToMany(() => EmployeeSlotSchedule, (slotSchedule) => slotSchedule.employee)
  slotSchedules: EmployeeSlotSchedule[];
}
