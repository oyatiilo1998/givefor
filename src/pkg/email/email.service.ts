import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  async send(mail: any) {
    const response = await this.mailService.sendMail({
      to: mail.toEmail,
      from: this.configService.get<string>('SENDGRID_EMAIL'),
      subject: 'Temporary password',
      template: 'temporary-password',
      context: {
        mail: mail,
      },
    });

    return response;
  }

  async sendCode(mail: any) {
    const response = await this.mailService.sendMail({
      to: mail.toEmail,
      from: this.configService.get<string>('SENDGRID_EMAIL'),
      subject: 'Confirmation code from givefor',
      template: 'confirmation',
      context: {
        mail: mail,
      },
    });
    console.log(this.configService.get<string>('SENDGRID_EMAIL'));
    return response;
  }
}
