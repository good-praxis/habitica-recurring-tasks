import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { randomBytes } from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  api_key: Buffer;

  @Column({ default: randomBytes(256) })
  secret: Buffer;
}
