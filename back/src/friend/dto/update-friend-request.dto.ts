import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateFriendRequestDTO {
  @ApiProperty()
  @IsNumber()
  requestId: number;
}
