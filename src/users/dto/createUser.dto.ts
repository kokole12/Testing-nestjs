import { IsAlpha, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  name: string;
}
