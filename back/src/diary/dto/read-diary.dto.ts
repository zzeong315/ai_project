import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ReadDiaryDto {
  /**
   *
   * @example 'daily or monthly'
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  period?: string;

  /**
   *
   * @example 'yyyy-mm-dd'
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  date?: string;

  /**
   *
   * @example 'yyyy-mm'
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  month?: string;
}
