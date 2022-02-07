import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MeetRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;
}