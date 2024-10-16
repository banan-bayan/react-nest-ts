import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';

@Entity({ name: 'employee_slot_schedules', schema: 'employee' })
export class EmployeeSlotSchedule {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @ManyToOne(() => Employee, (employee) => employee.slotSchedules)
  employee: Employee;
}
