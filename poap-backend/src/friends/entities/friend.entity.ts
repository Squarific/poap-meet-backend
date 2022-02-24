import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Unique(["initiator", "target"])
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  initiator: string;

  @Column()
  target: string;
}