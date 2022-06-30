import { ExistingUserDTO } from './../user/dto/ExistingUser.dto';
import { UserInterface } from './../user/interface/User.interface';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { UserDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthsController {
  constructor(private authsService: AuthsService) {}
  @Post('register')
  register(@Body() createUserDto: UserDTO): Promise<UserInterface | null> {
    return this.authsService.register(createUserDto);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() createUserDto: ExistingUserDTO,
  ): Promise<{ token: string } | null> {
    return this.authsService.login(createUserDto);
  }
}
