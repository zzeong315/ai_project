import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiaryDto {
  @ApiProperty()
  @IsString()
  content: string;
}
