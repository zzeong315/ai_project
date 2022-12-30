import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource, Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { FriendRequest } from './entities/friendRequest.entity';
import * as uuid from 'uuid';
import { Diary } from 'src/diary/entities/diary.entity';

@Injectable()
export class FriendService {
  constructor(
    private readonly userService: UserService,
    private dataSource: DataSource,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}

  async sendFriendRequest(currentUserId: string, code: string) {
    const fromUser = await this.userService.findOneById(currentUserId);
    const toUser = await this.userService.findOneByCode(code);
    await this.verifyRequest(fromUser, toUser);
    const friendRequest = new FriendRequest();
    friendRequest.fromUserId = fromUser.id;
    friendRequest.toUserId = toUser.id;
    friendRequest.requestProgress = 0;
    await this.friendRequestRepository.save(friendRequest);
    return '친구 요청 보냄';
  }

  async verifyRequest(fromUser: User, toUser: User) {
    if (!toUser || fromUser.id === toUser.id) {
      throw new HttpException('유효하지 않은 코드입니다.', 481);
    }

    const isFromFriendExist = await this.findFriendId(fromUser.id);
    const isToFriendExist = await this.findFriendId(toUser.id);

    if (isFromFriendExist !== null || isToFriendExist !== null) {
      throw new HttpException('이미 친구가 있습니다.', 482);
    }

    const isFromFriendRequestExist = await this.findSendedFriendRequest(
      fromUser.id,
    );
    isFromFriendRequestExist.forEach((request) => {
      if (request.toUserId === toUser.id && request.requestProgress === 0) {
        throw new HttpException(
          '같은 유저에게 보낸 대기중인 요청이 있습니다.',
          483,
        );
      }
    });
  }

  async findReceivedFriendRequest(currentUserId: string) {
    const friendRequestList = await this.friendRequestRepository.find({
      where: { toUserId: currentUserId, requestProgress: 0 },
    });
    const resFriendRequestList = [];
    for (const request of friendRequestList) {
      const user = await this.userService.findOneById(request.fromUserId);
      const nickname = user.nickname;
      resFriendRequestList.push({
        id: request.id,
        fromUserId: request.fromUserId,
        fromUserNickname: nickname,
        createdAt: request.createdAt,
      });
    }
    return resFriendRequestList;
  }

  async findSendedFriendRequest(currentUserId: string) {
    const friendRequestList = await this.friendRequestRepository.find({
      where: { fromUserId: currentUserId, requestProgress: 0 },
    });
    return friendRequestList;
  }

  async acceptFriendRequest(currentUserId: string, requestId: number) {
    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: requestId },
      relations: {
        fromUser: true,
        toUser: true,
      },
    });
    if (!friendRequest) {
      throw new BadRequestException('해당하는 요청이 없습니다.');
    }

    const { toUserId, fromUserId, fromUser, toUser } = friendRequest;

    if (toUserId !== currentUserId) {
      throw new UnauthorizedException('수락할 권한이 없습니다.');
    }
    friendRequest.requestProgress = 1;
    await this.friendRequestRepository.save(friendRequest);

    const receivedFriendRequests = await this.findReceivedFriendRequest(
      currentUserId,
    );
    const statusChangedRequests = receivedFriendRequests.flatMap((request) => {
      return {
        ...request,
        requestProgress: request.id === requestId ? 1 : 3,
      };
    });

    const friendId = uuid.v4();
    const fromFriend = {
      ...new Friend(),
      friendId,
      fromUserId,
      toUserId,
      title: `${fromUser.nickname} & ${toUser.nickname} 's diary`,
      status: 1,
    };

    const toFriend = {
      ...new Friend(),
      friendId,
      fromUserId: toUserId,
      toUserId: fromUserId,
      title: `${toUser.nickname} & ${fromUser.nickname} 's diary`,
      status: 1,
    };

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.friendRequestRepository.save(statusChangedRequests);
      await this.friendRepository.save(fromFriend);
      await this.friendRepository.save(toFriend);
      return '수락 완료';
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async rejectFriendRequest(currentUserId: string, requestId: number) {
    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: requestId },
    });
    if (friendRequest.toUserId !== currentUserId) {
      throw new UnauthorizedException('거절할 권한이 없습니다.');
    }
    friendRequest.requestProgress = 2;
    await this.friendRequestRepository.save(friendRequest);
    return '거절 완료';
  }

  async findFriendId(userId: string) {
    const friend = await this.friendRepository.findOne({
      where: { fromUserId: userId },
    });
    return friend === null ? null : friend.friendId;
  }

  async findFriend(userId: string) {
    const me = await this.friendRepository.findOne({
      where: { fromUserId: userId },
    });

    if (me === null) {
      return null;
    }

    const friend = await this.friendRepository
      .createQueryBuilder('friend')
      .select('friend.id')
      .addSelect('friend.friendId')
      .addSelect('friend.fromUserId')
      .addSelect('friend.toUserId')
      .addSelect('friend.title')
      .addSelect('friend.createdAt')
      .addSelect('fromUser.nickname') // fromUser는 내 정보이고, toUser가 친구의 정보입니다. 위에서 fromUserId를 현재 사용자ID로 검색했기 때문에
      .addSelect('toUser.nickname') // fromUser는 내 정보이고, toUser가 친구의 정보입니다. 위에서 fromUserId를 현재 사용자ID로 검색했기 때문에
      .leftJoin('friend.toUser', 'toUser', 'friend.toUserId = toUser.id')
      .leftJoin(
        'friend.fromUser',
        'fromUser',
        'friend.fromUserId = fromUser.id',
      )
      .where(`friend.friendId = :friendId`, { friendId: me.friendId })
      .andWhere(`friend.fromUserId = :myUserId`, { myUserId: userId }) // fromUserId가 내 ID인 경우
      .andWhere(`friend.status = :status`, { status: 1 }) // 친구 관계가 유지되고 있는 경우
      .getRawMany();

    return {
      id: friend[0].friend_id,
      friendId: friend[0].friend_friendId,
      fromUserId: friend[0].friend_fromUserId,
      fromUserNickname: friend[0].fromUser_nickname,
      toUserId: friend[0].friend_toUserId,
      toUserNickname: friend[0].toUser_nickname,
      title: friend[0].friend_title,
      createdAt: friend[0].friend_createdAt,
    };
  }

  async findTitle(fromUserId: string) {
    const friend = await this.friendRepository.findOne({
      where: { fromUserId },
    });
    return friend.title;
  }

  async disconnectFriend(currentUserId: string) {
    const friendId = await this.findFriendId(currentUserId);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.diaryRepository
        .createQueryBuilder('diary')
        .delete()
        .where('friendId=:friendId', { friendId })
        .execute();

      await this.friendRepository
        .createQueryBuilder('friend')
        .delete()
        .where('friendId=:friendId', { friendId })
        .execute();
      return '연결 끊기 완료';
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateDiaryTitle(currentUserId: string, title: string) {
    await this.friendRepository
      .createQueryBuilder('friend')
      .update(Friend)
      .set({ title: title })
      .where('fromUserId = :fromUserId', { fromUserId: currentUserId })
      .execute();
    return '다이어리 제목 수정 완료';
  }
}
