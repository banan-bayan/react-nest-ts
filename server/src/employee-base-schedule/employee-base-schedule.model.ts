import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employee/employee.model';

@Entity({ name: 'employee_base_schedules', schema: 'employee' })
export class EmployeeBaseSchedule {

  @ApiProperty({ example: 1, description: 'Идентификатор записи' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: '2024-10-07T09:00:00Z', description: 'Дата и время начала рабочего периода' })
  @Column({ type: 'timestamptz' })
  start: Date;

  @ApiProperty({ example: '2024-10-08T18:00:00Z', description: 'Дата и время окончания рабочего периода' })
  @Column({ type: 'timestamptz' })
  end: Date;

  @ApiProperty({ description: 'Сотрудник, связанный с этим расписанием' })
  @ManyToOne(() => Employee, { eager: true })
  employee: Employee;
}
