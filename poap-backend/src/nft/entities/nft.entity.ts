import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tokenid: number;

  @Column()
  initiator: string;

  @Column()
  target: string;
}