import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendFriendRequestDTO {
  @ApiProperty()
  @IsString()
  code: string;
}
