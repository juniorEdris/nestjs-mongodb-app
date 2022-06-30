import { Controller, Get, Param } from '@nestjs/common';
import { UserInterface } from './interface/User.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserInterface | null> {
    return this.userService.findById(id);
  }
}
