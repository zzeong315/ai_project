import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  socialId?: string;

  @IsString()
  @IsOptional()
  profileImgUrl?: string;
}
