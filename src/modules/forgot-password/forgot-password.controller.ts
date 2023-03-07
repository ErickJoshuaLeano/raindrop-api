import { Controller, Post, Body } from '@nestjs/common';
import { ForgotPasswordDto } from './forgot-password.dto';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('api/forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.forgotPasswordService.sendPasswordResetEmail(
      forgotPasswordDto.email,
    );
    return { message: 'Password reset email sent successfully' };
  }
}
