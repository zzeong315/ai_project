import { Friend } from 'src/friend/entities/friend.entity';
import { Diary } from 'src/diary/entities/diary.entity';
import { Planner } from 'src/planner/entities/planner.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { FriendRequest } from 'src/friend/entities/friendRequest.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 10, unique: true })
  nickname: string;

  @Column({ length: 100 })
  hashedPassword: string;

  @Column({ length: 30, default: null })
  socialId: string;

  @Column({ length: 100, default: null })
  profileImgUrl: string;

  @Column()
  signupVerifyToken: string;

  @Column()
  registerProgress: number;

  @CreateDateColumn({ type: 'datetime' })
  registeredAt: Date;

  @Column()
  friendCode: string;

  @Column()
  survey: string;

  @OneToMany(() => Planner, (planner) => planner.user)
  planners: Planner[];

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries: Diary[];

  @OneToMany(() => Friend, (friendFrom) => friendFrom.fromUser)
  friend: Friend;

  @OneToMany(() => FriendRequest, (request) => request.toUser)
  receivedFriendRequest: FriendRequest;

  @OneToMany(() => FriendRequest, (request) => request.fromUser)
  sentFriendRequest: FriendRequest;
}
