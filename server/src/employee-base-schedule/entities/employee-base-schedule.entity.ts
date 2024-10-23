import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';

@Entity({ name: 'employee_base_schedules', schema: 'employee' })
export class EmployeeBaseSchedule {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'timestamptz' })
  start: Date;

  @Column({ type: 'timestamptz' })
  end: Date;

  @ManyToOne(() => Employee, { eager: true })
  employee: Employee;
}
