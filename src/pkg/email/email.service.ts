import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  async user(mail: any) {
    const response = await this.mailService.sendMail({
      to: mail.toEmail,
      from: this.configService.get<string>('SENDGRID_EMAIL'),
      subject: 'Plain Text Email ✔',
      template: 'confirmation',
      context: {
        mail: mail,
      },
    });

    return response;
  }
}
