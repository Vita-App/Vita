import { Request, Response } from 'express';
import { sendEmail } from '../service/email-service';
import { makeTemplate } from '../templates';
import { ADMIN } from '../config/keys';

let otp: number;

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email or password is missing',
    });
  }

  if (email !== ADMIN.email || password !== ADMIN.password) {
    return res.status(400).json({
      error: 'Invalid Credentials',
    });
  }

  otp = Math.floor(Math.random() * 100000);

  const template = makeTemplate('email/admin-login', { otp });

  try {
    const emailID = await sendEmail(email, 'Vita Admin Login', template);

    return res.status(200).json({
      message: 'Email sent',
      emailID,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Email could not be sent',
    });
  }
};

export const adminLoginVerify = async (req: Request, res: Response) => {
  if (!req.params.otp) {
    return res.status(400).json({
      error: 'OTP is missing',
    });
  }

  if (req.params.otp !== otp.toString()) {
    return res.status(400).json({
      error: 'Invalid OTP',
    });
  }

  return res.status(200).json({
    message: 'OTP verified',
  });
};
