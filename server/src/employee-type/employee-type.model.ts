import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EmployeeWorkType } from 'src/employee-work-type/employee-work-type.model';

@Entity({ name: 'employee_types', schema: 'employee' })
export class EmployeeType {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @OneToMany(() => EmployeeWorkType, (workType) => workType.employeeType)
  works: EmployeeWorkType[];
}
