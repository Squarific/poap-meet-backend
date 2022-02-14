import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  challenge: string;
}