import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Res,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewPasswordDTO } from './dto/new-password.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateSurveyDTO } from './dto/update-survey.dto';

import { Response } from 'express';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: '회원 가입 API',
    description: 'email, nickname, password를 입력하여 유저를 생성한다.',
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    await this.userService.create(createUserDto);
    return response.status(201).send('회원가입 완료');
  }

  @Post('/email-verify')
  @ApiOperation({ summary: '이메일 인증 API' })
  @Redirect(`http://kdt-ai5-team05.elicecoding.com/login`, 201)
  async verifyEmail(@Query() query): Promise<Object> {
    const { signupVerifyToken } = query;
    await this.userService.verifyEmail(signupVerifyToken);
    return {
      url: `http://kdt-ai5-team05.elicecoding.com/login`,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 회원 정보 조회 API' })
  findOne(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Put(':id/nickname')
  @ApiOperation({ summary: '닉네임 수정 API' })
  updateNickname(
    @Param('id') id: string,
    @Body() updateNicknameDto: UpdateNicknameDto,
  ) {
    return this.userService.updateNickname(id, updateNicknameDto);
  }

  @Put(':id/password')
  @ApiOperation({ summary: '비밀번호 수정 API' })
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Put(':id/survey')
  @ApiOperation({ summary: '설문조사 수정 API' })
  updateSurvey(
    @Param('id') id: string,
    @Body() updateSurveyeDto: UpdateSurveyDTO,
  ) {
    return this.userService.updateSurvey(id, updateSurveyeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('/new-password')
  @ApiOperation({
    summary: '비밀번호 찾기 API',
  })
  newPassword(@Body() newPasswordDTO: NewPasswordDTO) {
    const { email } = newPasswordDTO;
    return this.userService.newPassword(email);
  }
}
