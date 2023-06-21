import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'live.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'api',
          pass: '56dc7b2920759da9eafa36948d8cdb70',
        },
      },
      template: {
        dir: 'mails',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
