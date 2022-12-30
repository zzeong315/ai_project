import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DiaryDateDto {
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  month: number;
}
