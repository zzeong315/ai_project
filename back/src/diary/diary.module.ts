import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendModule } from 'src/friend/friend.module';
import { DiaryDAO } from './dao/diary.dao';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { Diary } from './entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary]), FriendModule, HttpModule],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryDAO],
  exports: [DiaryService],
})
export class DiaryModule {}
