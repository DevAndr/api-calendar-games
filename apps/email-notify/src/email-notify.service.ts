import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {Transporter} from 'nodemailer';
import {CreateUserEventDto} from '@email/dto/create-user-event.dto';

@Injectable()
export class EmailNotifyService {
    transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'gamereleases09@gmail.com',
                pass: 'aslh zbgx fbkv ikyr',
            },
        });
    }

    sendConfirmCode(data: CreateUserEventDto) {
        const mailOptions = {
            from: 'UnDeadGamesOfficial@gmail.com',
            to: data.email,
            subject: 'Код подтверждения',
            text: `Ваш код подтверждения: ${data.confirmationCode}`,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email: ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
