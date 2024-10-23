import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmployeeType } from 'src/employee-type/entities/employee-type.entity';

@Entity({ name: 'employee_work_types', schema: 'employee' })
export class EmployeeWorkType {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => EmployeeType, (employeeType) => employeeType.works)
  employeeType: EmployeeType;
}
