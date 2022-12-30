import { IsString } from 'class-validator';

export class SocialLoginDTO {
  /**
   *
   * @example 'code'
   */
  @IsString()
  code: string;
}
