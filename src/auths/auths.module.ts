import { JwtStrategy } from './../guards/jwt.strategy';
import { JwtGuard } from './../guards/jwt.guards';
import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, JwtGuard, JwtStrategy],
})
export class AuthsModule {}
