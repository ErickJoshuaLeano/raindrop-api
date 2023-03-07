import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: this.configService.get<string>('username'),
        pass: this.configService.get<string>('password'),
      },
    });
  }

  async sendResetPasswordEmail(to: string, token: string, name: string) {
    const mailOptions = {
      from: '"Raindrop" <noreply@Raindrop.com>',
      to,
      subject: 'Password Reset Request',
      html: `
      <div style="background-color: #f2f2f2; padding: 20px;">
         <div style="background-color: #ffffff; padding: 20px: border-radius: 10px;">
            <p style="font-size: 18px; font-weight: bold;">Hi <strong>${name} </strong>,</p>
            <p style="font-size: 16px;">We received a request to reset the password for your account.</p>
            <p style="font-size: 16px;">To reset your password, click on the button below.</p>
            <p style="text-align: center;"><a href="http://localhost:3000/forgot"</a></p>
            <p style="font-size: 16px;">If you did not make this request then please ignore this email.</p>
            <p style="font-size: 16px;">Thank you for using Raindrops!</p>
            <p style="font-size: 16px;">Best regards, <br> <strong>RAINDROP</strong></p>
        </div>
      </div>`,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
