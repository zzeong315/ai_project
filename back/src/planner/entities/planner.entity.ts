import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Planner {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: 0 })
  isRecommended: number;

  @Column({ default: 0 })
  isCompleted: number;

  @Column({ length: 100, default: null })
  imgUrl: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.planners)
  user: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @Column()
  priority: number;
}
