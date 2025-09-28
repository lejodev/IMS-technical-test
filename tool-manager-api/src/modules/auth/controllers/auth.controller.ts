import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { SignInDto } from '../dto/signIn.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  create(@Body() signInDto: SignInDto) {
    console.log('signInDto', signInDto);
    return this.authService.signIn(signInDto);
  }
}
