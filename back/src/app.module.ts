import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { PlannerModule } from './planner/planner.module';
import { JwtModule } from '@nestjs/jwt';
import { FriendModule } from './friend/friend.module';
import { ActivityModule } from './activity/activity.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      timezone: 'Asia/Seoul',
      // synchronize: true,
      ssl: { rejectUnauthorized: true },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    DiaryModule,
    PlannerModule,
    FriendModule,
    ActivityModule,
  ],
})
export class AppModule {}
