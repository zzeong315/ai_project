import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class NewPasswordDTO {
  /**
   *
   * @example 'email@email.com'
   */
  @IsString()
  @IsEmail()
  email: string;
}
