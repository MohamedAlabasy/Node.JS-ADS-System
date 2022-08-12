import nodemailer from 'nodemailer';
import { Request } from 'express';

import EmailMessagesDesign from './emailMessagesDesign'

export default function emailVerification(request: Request, code: number, isResetPassword: boolean = false) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `"ADS System" <${process.env.USER}>`, // sender address
        to: request.body.email, // list of receivers
        subject: 'ADS System Verification Request', // Subject line
        text: 'ADS System', // plain text body
        html: EmailMessagesDesign(request.body.name, code, isResetPassword) // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            throw new Error(`Verification email error`)
        }
        console.log('Message sent: %s', info.messageId);
    });
}