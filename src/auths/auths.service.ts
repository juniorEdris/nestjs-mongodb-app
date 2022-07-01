import { UserService } from './../user/user.service';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/user/interface/User.interface';
import { UserDTO } from './dto/auth.dto';
import { NewUserDTO } from 'src/user/dto/User.dto';
import { ExistingUserDTO } from 'src/user/dto/ExistingUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(createUserDto: UserDTO): Promise<UserInterface | any> {
    const { name, email, password } = createUserDto;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser)
      throw new HttpException(
        'Email taken! Please try another email.',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword);

    return this.userService._getUserInfo(newUser);
  }

  async isMatchedPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<NewUserDTO | null> {
    const user = await this.userService.findByEmail(email);
    const userExist = !!user;

    if (!userExist) return null;

    const passwordMatched = await this.isMatchedPassword(
      password,
      user.password,
    );

    if (!passwordMatched) return null;

    return this.userService._getUserInfo(user);
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
