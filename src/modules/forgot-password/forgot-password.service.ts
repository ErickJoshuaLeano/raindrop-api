import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { User } from '../users/user.entity';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async sendPasswordResetEmail(email: string) {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'mariecristine.torres.04@gmail.com',
        pass: 'pzseyvogilwumjec',
      },
    });

    const resetLink = `http://localhost:3000/forgot?token=${resetToken}`;

    const mailOptions = {
      from: '"Raindrop" <noreply@Raindrop.com>',
      to: email,
      subject: 'Password Reset Request',
      html: `
      <div style="background-color: #f2f2f2; padding: 20px;">
         <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
            <p style="font-size: 18px; font-weight: bold;">Hi <strong>${name} </strong>,</p>
            <p style="font-size: 16px;">We received a request to reset the password for your account.</p>
            <p style="font-size: 16px;">To reset your password, click on the button below.</p>
            <p style="text-align: center;"><a href="${resetLink}">${resetLink}<button style="padding: 10px 20px; background-color: #3cb371; color: #fff; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">Reset Password</button></a></p>
            <p style="font-size: 16px;">If you did not make this request then please ignore this email.</p>
            <p style="font-size: 16px;">Thank you for using Raindrops!</p>
            <p style="font-size: 16px;">Best regards, <br> <strong>RAINDROP</strong></p>
        </div>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error('Internal server error');
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
