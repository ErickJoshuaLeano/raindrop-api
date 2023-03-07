import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ForgotPasswordDto } from './forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const token = this.authService.generateForgotPasswordToken(user.id);
    const url = `http://localhost:3000/auth/reset-password/${token}`;

    await this.authService.sendForgotPasswordEmail(user.email, url);

    return {
      message: 'Password reset instructions have been sent to your email.',
    };
  }
}
