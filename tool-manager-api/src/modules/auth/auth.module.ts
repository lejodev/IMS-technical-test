import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { JWTHelper } from './services/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, WrapperService, JWTHelper],
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  exports: [AuthService, JWTHelper]
})
export class AuthModule { }
