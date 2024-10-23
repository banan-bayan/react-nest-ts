import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { EmployeeSlotSchedule } from 'src/employee-slot-schedule/entities/employee-slot-schedule.entity';
import { EmployeeBaseSchedule } from 'src/employee-base-schedule/entities/employee-base-schedule.entity';

@Entity({ name: 'employees', schema: 'employee' })
export class Employee {
  
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => EmployeeType, (employeeType) => employeeType)
  type: EmployeeType;

  @OneToMany(() => EmployeeSlotSchedule, (slotSchedule) => slotSchedule.employee)
  slotSchedules: EmployeeSlotSchedule[];

  @OneToMany(() => EmployeeBaseSchedule, baseSchedule => baseSchedule.employee)
  employeeBaseSchedule: EmployeeBaseSchedule[];
}
