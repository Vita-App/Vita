import nodemailer, { SendMailOptions } from 'nodemailer';
import {EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS} from '../config/keys';


export const sendEmail = async (to: string, subject: string, msg: string, icsFileContent?: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: true,
            auth: {
                user: EMAIL_USER, 
                pass: EMAIL_PASS 
            }
        });
        
        const emailOptions = <SendMailOptions> {
            from: `"Vita" <${EMAIL_USER}>`,
            to,
            subject,
            text: msg
        }
        
        if (icsFileContent)
            emailOptions.attachments = [
                {
                    filename: 'Event.ics',
                    content: icsFileContent
                }
            ]

        const info = await transporter.sendMail(emailOptions);
        
        return info.messageId;
    } catch(err) {
        throw err;
    }
}
