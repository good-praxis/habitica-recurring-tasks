import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { randomBytes } from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: string;

  @Column()
  api_key: Buffer;

  @Column({ default: null })
  secret: Buffer;
}
