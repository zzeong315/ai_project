import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { Planner } from 'src/planner/entities/planner.entity';
import { User } from 'src/user/entities/user.entity';
import { ActivityService } from './activity.service';
import { Activity } from './entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Diary, User, Planner])],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
