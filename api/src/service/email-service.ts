import nodemailer from 'nodemailer';
import {EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS} from '../config/keys';


export const sendEmail = async (to: string, subject: string, msg: string) => {
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
        
        const info = await transporter.sendMail({
            from: `"Vita" <${EMAIL_USER}>`,
            to,
            subject,
            text: msg,
        });
        
        return info.messageId;
    } catch(err) {
        throw err;
    }
}
