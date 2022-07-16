import { Request, Response } from 'express';
import { AdminModel } from '../Models/Admins';
import { sendEmail } from '../service/email-service';
import { makeTemplate } from '../utils/makeTemplate';

export const adminAuthController = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(200).json({
      isLoggedIn: false,
      message: 'User is not logged in.',
      user: {
        name: '',
        image_link: '',
      },
      cookies: undefined,
    });
  }

  return res.status(200).json({
    isLoggedIn: true,
    message: 'User is logged in',
    user: req.user,
    cookies: req.cookies,
  });
};

export const adminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await AdminModel.findOne({ email });
  if (!admin) {
    return res.status(401).json({
      error: 'Invalid email or password',
    });
  }

  const isPasswordMatch = await admin.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      error: 'Invalid email or password',
    });
  }

  const otp = await admin.generateOTP();
  const template = makeTemplate('adminOtp.hbs', {
    otp,
  });
  const emailId = await sendEmail(admin.email, 'Vita Admin Login', template);
  return res.status(200).json({
    message: 'Email sent',
    emailId,
  });
};

export const adminVerifyOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const admin = await AdminModel.findOne({ email });
  if (!admin) {
    return res.status(401).json({
      error: 'Invalid email or password',
    });
  }

  const isOtpMatch = await admin.verifyOTP(otp);
  if (!isOtpMatch) {
    return res.status(401).json({
      error: 'Invalid OTP',
    });
  }

  const token = admin.issueToken();

  res.cookie('adminToken', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 1,
  });

  return res.status(200).json({
    message: 'OTP verified',
    user: admin,
  });
};

/*
curl -X POST http://localhost:5000/api/admin/create --header 'Content-Type: application/json' \
--data-raw '{
    "name": "Rishabh Malhtora",
    "email": "rishabhmalhotraa01@gmail.com",
    "password": "password"
}'
*/

export const createAdminController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const admin = new AdminModel({
    name,
    email,
    password,
  });

  await admin.save();

  return res.status(201).json({
    message: 'Admin Created Successfully',
  });
};

export const adminLogoutController = async (req: Request, res: Response) => {
  res.clearCookie('adminToken');
  return res.json({
    success: true,
  });
};
