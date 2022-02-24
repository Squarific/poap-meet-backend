import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tokenid: string;

  @Column()
  initiator: string;

  @Column()
  target: string;
}