import { IsEmail, IsNotEmpty } from 'class-validator';

export class ExistingUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
