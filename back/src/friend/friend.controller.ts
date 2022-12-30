import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  Query,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FriendService } from './friend.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SendFriendRequestDTO } from './dto/send-friend-request.dto';
import { UpdateFriendRequestDTO } from './dto/update-friend-request.dto';
import { UpdateTitleDTO } from './dto/update-title-request.dto';

@Controller('friend')
@ApiTags('친구 API')
@ApiBearerAuth('access-token')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('/request')
  @ApiOperation({
    summary: '친구 요청 API',
    description: '친구 코드를 통해 친구 요청을 보낸다.',
  })
  @UseGuards(AuthGuard('jwt'))
  sendFriendRequest(
    @Req() request: Request,
    @Body() sendFriendRequestDTO: SendFriendRequestDTO,
  ) {
    const { code } = sendFriendRequestDTO;
    return this.friendService.sendFriendRequest(request.user['userId'], code);
  }

  @Get()
  @ApiOperation({
    summary: '친구 확인 API',
    description: '현재 친구를 확인한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  async findFriend(@Req() request: Request, @Res() response: Response) {
    const friend = await this.friendService.findFriend(request.user['userId']);
    if (friend === null) {
      return response.status(204).send();
    } else {
      return response.status(200).send(friend);
    }
  }

  @Get('/request')
  @ApiOperation({
    summary: '친구 요청 확인 API',
    description: '친구 요청 받은 목록을 확인한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  findFriendRequest(@Req() request: Request, @Query('side') side: string) {
    if (side === 'receive')
      return this.friendService.findReceivedFriendRequest(
        request.user['userId'],
      );
    else if (side === 'send')
      return this.friendService.findSendedFriendRequest(request.user['userId']);
    else
      return {
        message: 'side must be receive or send',
      };
  }

  @Put('/request/accept')
  @ApiOperation({
    summary: '친구 수락 API',
    description: '친구 요청을 수락한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  acceptFriendRequest(
    @Req() request: Request,
    @Body() updateFriendRequestDTO: UpdateFriendRequestDTO,
  ) {
    const { requestId } = updateFriendRequestDTO;
    return this.friendService.acceptFriendRequest(
      request.user['userId'],
      requestId,
    );
  }

  @Put('/request/reject')
  @ApiOperation({
    summary: '친구 거절 API',
    description: '친구 요청을 거절한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  rejectFriendRequest(
    @Req() request: Request,
    @Body() updateFriendRequestDTO: UpdateFriendRequestDTO,
  ) {
    const { requestId } = updateFriendRequestDTO;
    return this.friendService.rejectFriendRequest(
      request.user['userId'],
      requestId,
    );
  }

  @Delete()
  @ApiOperation({
    summary: '친구 끊기 API',
    description: '연결된 친구를 끊는다.',
  })
  @UseGuards(AuthGuard('jwt'))
  disconnectFriend(@Req() request: Request) {
    return this.friendService.disconnectFriend(request.user['userId']);
  }

  @Put('/title')
  @ApiOperation({
    summary: '다이어리 제목 수정 API',
    description: '다이어리 제목을 수정한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  updateDiaryTitle(
    @Req() request: Request,
    @Body() updateTitleDTO: UpdateTitleDTO,
  ) {
    const { title } = updateTitleDTO;
    return this.friendService.updateDiaryTitle(request.user['userId'], title);
  }
}
