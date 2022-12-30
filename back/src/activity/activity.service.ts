import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { Planner } from 'src/planner/entities/planner.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Planner)
    private plannerRepository: Repository<Planner>,
  ) {}

  async getActivity() {
    const now = new Date();
    const today =
      now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    const todayDiaries = await this.diaryRepository.find({
      where: { date: today },
    });

    todayDiaries.forEach(async (element) => {
      const user = await this.userRepository.findOne({
        where: { id: element.userId },
      });
      const tomorrow =
        now.getFullYear() +
        '-' +
        (now.getMonth() + 1) +
        '-' +
        (now.getDate() + 1);
      const category = user.survey?.split(',') ?? 0;
      if (element.emotion === '슬픔') {
        const data = await this.activityRepository
          .createQueryBuilder('activity')
          .select(['activity.activity'])
          .where('activity.positive = 1')
          .orderBy('RAND()')
          .limit(1)
          .getOne();

        this.plannerRepository.save({
          description: data.activity,
          date: tomorrow,
          isRecommended: 1,
          userId: element.userId,
          prority: 1,
        });
      } else if (category !== 0) {
        category.push('공통');
        const data = await this.activityRepository
          .createQueryBuilder('activity')
          .select(['activity.activity'])
          .where('activity.category IN (:category)', { category })
          .orderBy('RAND()')
          .limit(1)
          .getOne();

        this.plannerRepository.save({
          description: data.activity,
          date: tomorrow,
          isRecommended: 1,
          userId: element.userId,
          prority: 1,
        });
      } else {
        const data = await this.activityRepository
          .createQueryBuilder('activity')
          .select(['activity.activity'])
          .orderBy('RAND()')
          .limit(1)
          .getOne();
        this.plannerRepository.save({
          description: data.activity,
          date: tomorrow,
          isRecommended: 1,
          userId: element.userId,
          prority: 1,
        });
      }
    });
  }

  private readonly logger = new Logger(ActivityService.name);

  @Cron('50 59 23 * * *', {
    timeZone: 'Asia/Seoul',
  })
  handleCron() {
    this.getActivity();
    this.logger.log('Recommend new activity');
  }
}
