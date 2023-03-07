import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string) {
    // find if user exist with this email
    const user =
      (await this.userService.findOneByEmail(email)) ||
      (await this.userService.findOneByUsername(email));
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
  async sendForgotPasswordEmail(email: string, url: string) {
    const options = {
      to: email,
      subject: 'Forgot Password - Example App',
      text: `Please click on the following link to reset your password: ${url}`,
    };
    await this.mailerService.sendMail(options);
  }

  generateForgotPasswordToken(userId: number) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = '1h';
    return jwt.sign({ sub: userId }, secret, { expiresIn });
  }
}
