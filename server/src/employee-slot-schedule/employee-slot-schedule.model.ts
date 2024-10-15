import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employee/employee.model';

@Entity({ name: 'employee_slot_schedules' })
export class EmployeeSlotSchedule {

  @ApiProperty({ example: 1, description: 'Идентификатор временного слота' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: '2024-10-07T10:00:00Z', description: 'Дата и время начала временного слота' })
  @Column({ type: 'timestamptz' })
  startDate: Date;

  @ApiProperty({ example: '2024-10-08T10:00:00Z', description: 'Дата и время окончания временного слота' })
  @Column({ type: 'timestamptz' })
  endDate: Date;

  @ManyToOne(() => Employee, (employee) => employee.slotSchedules)
  employee: Employee;
}
