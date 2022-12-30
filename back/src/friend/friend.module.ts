import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Diary } from 'src/diary/entities/diary.entity';
import { EmailService } from 'src/email/email.service';
import { UserModule } from 'src/user/user.module';
import { SendFriendRequestDTO } from './dto/send-friend-request.dto';
import { Friend } from './entities/friend.entity';
import { FriendRequest } from './entities/friendRequest.entity';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest, Friend, Diary]),
    AuthModule,
    UserModule,
  ],
  controllers: [FriendController],
  providers: [FriendService, EmailService, SendFriendRequestDTO],
  exports: [FriendService],
})
export class FriendModule {}
