import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailService } from 'src/email/email.service';
import { AuthModule } from 'src/auth/auth.module';
import { FriendModule } from 'src/friend/friend.module';
import { Diary } from 'src/diary/entities/diary.entity';
import { Friend } from 'src/friend/entities/friend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friend, Diary]),
    // forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService],
})
export class UserModule {}
