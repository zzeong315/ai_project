import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOneOptions, Repository } from 'typeorm';
import { DiaryDateDto } from '../dto/diary-date.dto';
import { Diary } from '../entities/diary.entity';

@Injectable()
export class DiaryDAO {
  constructor(
    @InjectRepository(Diary) private diaryRepository: Repository<Diary>,
  ) {}

  createOne(diary: Diary) {
    return this.diaryRepository.save(diary);
  }

  async getMany(options: string, data: object) {
    const diaryList = await this.diaryRepository
      .createQueryBuilder('diary')
      .select([
        'diary.id',
        'diary.friendId',
        'diary.userId',
        'diary.content',
        'diary.date',
        'user.nickname',
      ])
      .where(options, data)
      .innerJoin('diary.user', 'user')
      .getRawMany();

    return diaryList.map((diary) => {
      return {
        id: diary.diary_id,
        friendId: diary.diary_friendId,
        userId: diary.diary_userId,
        content: diary.diary_content,
        date: diary.diary_date,
        nickname: diary.user_nickname,
      };
    });
  }

  getOne(options: FindOneOptions<Diary>) {
    return this.diaryRepository.findOne(options);
  }

  updateEmotion(emotion: string, diaryId: number) {
    return this.diaryRepository.save({ id: diaryId, emotion });
  }

  async getEmotions(userId: string, diaryDateDto: DiaryDateDto) {
    const { year, month } = diaryDateDto;

    const plans = await this.diaryRepository
      .createQueryBuilder('diary')
      .select(['diary.date', 'diary.emotion'])
      .where('diary.userId = :userId', { userId })
      .andWhere('diary.date like :date', { date: `${year}-${month}%` })
      .getMany();

    const days = {};
    plans.forEach((element) => {
      days[parseInt(element.date.toString().split(' ')[2])] = element.emotion;
    });
    return days;
  }
}
