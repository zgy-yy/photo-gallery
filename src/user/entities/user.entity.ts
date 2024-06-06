import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  userName: string;

  @Column({ length: 100 })
  password: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @CreateDateColumn()
  registrationDate: Date;

  @Column({ nullable: true })
  avatarURL: string;
}