import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

@Entity({ name: 'roles', schema: 'user' })
export class Role {
  @ApiProperty({ example: 1, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'User', description: 'Права пользователя', enum: UserRole })
  @Column({ type: 'varchar', unique: true })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: 'varchar' })
  description: string;
}
