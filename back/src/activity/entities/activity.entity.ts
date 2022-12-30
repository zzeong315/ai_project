import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Activity {
  @Column()
  category: string;

  @PrimaryColumn()
  activity: string;
}
