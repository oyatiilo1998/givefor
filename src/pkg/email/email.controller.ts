import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('email')
export class EmailController {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}

  @Get('plain-text-email')
  async plainTextEmail(@Query('toemail') toEmail) {
    const response = await this.mailService.sendMail({
      to: toEmail,
      from: this.configService.get<string>('SENDGRID_EMAIL'),
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
    });
    return response;
  }

  @Post('html-email')
  async postHTMLEmail(@Body() mail: any) {
    const response = await this.mailService.sendMail({
      to: 'o.abdusattorov@ventionteams.com',
      from: 'oyatillo_abdusattorov@mail.ru',
      subject: 'HTML Dynamic Template',
      template: 'confirmation',
      context: {
        mail: mail,
      },
    });
    console.log(response);
    return 'success';
  }
}
