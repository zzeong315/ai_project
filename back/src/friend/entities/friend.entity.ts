import { Diary } from 'src/diary/entities/diary.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  friendId: string;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @Column()
  title: string;

  @Column()
  status: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.friend)
  fromUser: User;

  @ManyToOne(() => User)
  toUser: User;

  @OneToMany(() => Diary, (diary) => diary.friend)
  diaries: Diary[];
}
