import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { WorkRequest } from 'src/work-request/entities/work-request.entity';

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

  @OneToMany(() => WorkRequest, workRequest => workRequest.slot)
    workRequest: WorkRequest[];
}
