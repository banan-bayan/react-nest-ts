import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';
import { WorkRequest } from 'src/work-request/entities/work-request.entity';

@Entity({ name: 'employee_work_types', schema: 'employee' })
export class EmployeeWorkType {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'float' })
  price: number;

  @OneToMany(() => EmployeeType, (employeeType) => employeeType.employeeWorkType)
  employeeType: EmployeeType[];

  @OneToMany(() => WorkRequest, (workRequest) => workRequest.employeeWorkType)
  workRequest: WorkRequest[];
}
