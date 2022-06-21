import { Request, Response } from 'express';
import { AdminModel } from '../Models/Admins';
import { sendEmail } from '../service/email-service';
import { makeTemplate } from '../templates';

export const adminAuthController = async (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      isLoggedIn: true,
      user: req.user,
    });
  } else {
    res.status(200).json({
      isLoggedIn: false,
    });
  }
};

export const adminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await AdminModel.findOne({ email });
  if (!admin) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const isPasswordMatch = await admin.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: 'Invalid email or password',
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
      message: 'Invalid email or password',
    });
  }

  const isOtpMatch = await admin.verifyOTP(otp);
  if (!isOtpMatch) {
    return res.status(401).json({
      message: 'Invalid OTP',
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
