import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTitleDTO {
  @ApiProperty()
  @IsString()
  title: string;
}
