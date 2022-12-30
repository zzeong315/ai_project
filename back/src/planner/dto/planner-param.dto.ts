import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PlannerIdDto {
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
