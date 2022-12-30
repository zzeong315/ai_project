import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateSurveyDTO {
  @ApiProperty()
  @IsArray()
  survey: Array<String>;
}
