import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateNicknameDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  nickname: string;
}
