import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'src/roles/roles.model';

@Entity({ name: 'api/users' })
export class User {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'pididdy@gmail.com', description: 'Почтовый адрес' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({ example: 'dima', description: 'Имя пользователя' })
  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
