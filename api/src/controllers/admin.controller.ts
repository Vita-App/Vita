import { Request, Response } from 'express';
import { Document, isValidObjectId } from 'mongoose';
import { AdminModel } from '../Models/Admins';
import { BannerModel } from '../Models/Banner';
import { MentorModel, UserModel } from '../Models/User';
import { BookingModel } from '../Models/Booking';
import { sendEmail } from '../service/email-service';
import { MentorSchemaType, UserSchemaType } from '../types';
import { makeTemplate } from '../utils/makeTemplate';
import notificationController from './notification.controller';
import { APP_NAME, ASSET_FOLDER } from '../config/keys';

const adminAuth = async (req: Request, res: Response) => {
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

const adminLogin = async (req: Request, res: Response) => {
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
    appName: APP_NAME,
    assetFolder: ASSET_FOLDER,
  });
  const emailId = await sendEmail(
    admin.email,
    `${APP_NAME} Admin Login`,
    template,
  );
  return res.status(200).json({
    message: 'Email sent',
    emailId,
  });
};

const adminVerifyOtp = async (req: Request, res: Response) => {
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

const createAdmin = async (req: Request, res: Response) => {
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

const adminLogout = async (req: Request, res: Response) => {
  res.clearCookie('adminToken');
  return res.json({
    success: true,
  });
};

const approveMentor = async (req: Request, res: Response) => {
  const { id } = req.body;

  let mentor: (Document & MentorSchemaType) | null = null;
  if (id && isValidObjectId(id)) mentor = await MentorModel.findById(id);

  if (!mentor) {
    return res.status(401).json({
      error: 'Mentor Not Found',
    });
  }

  mentor.approved = true;

  await mentor.save();

  await notificationController.notify(
    mentor._id,
    'Your application has been approved',
    'Application Approved',
  );

  try {
    await sendEmail(
      mentor.email,
      `${APP_NAME} Application Approved!`,
      makeTemplate('acceptMentor.hbs', {
        appName: APP_NAME,
        assetFolder: ASSET_FOLDER,
      }),
    );
  } catch (err) {
    return res.status(500).json({
      message: "Email didn't sent",
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Mentor Approved!',
  });
};

const rejectMentor = async (req: Request, res: Response) => {
  const { id } = req.query;

  let user: (Document & UserSchemaType) | null = null;
  if (id && isValidObjectId(id)) user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "User didn't found!",
    });
  }

  await Promise.all([
    user.delete(),
    MentorModel.deleteOne({ _id: user.mentor_information }),
  ]);

  try {
    await sendEmail(
      user.email,
      `${APP_NAME} Application rejected`,
      makeTemplate('rejectMentor.hbs', {
        appName: APP_NAME,
        assetFolder: ASSET_FOLDER,
      }),
    );
    return res.status(200).json({
      success: true,
      message: 'Mentor rejected successfully!',
    });
  } catch (err) {
    return res.status(500).json({
      message: "Email didn't sent",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  let user: (Document & UserSchemaType) | null = null;
  if (id && isValidObjectId(id)) user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  await Promise.all([
    user.delete(),
    MentorModel.deleteOne({ _id: user.mentor_information }),
  ]);

  try {
    await sendEmail(
      user.email,
      'User account deleted',
      makeTemplate('accountDeleted.hbs', {
        email: user.email,
        appName: APP_NAME,
        assetFolder: ASSET_FOLDER,
      }),
    );
    return res.status(200).json({
      success: true,
      message: 'Mentor rejected successfully!',
    });
  } catch (err) {
    return res.status(500).json({
      message: "Email didn't sent",
    });
  }
};

const changeTopMentorStatus = async (req: Request, res: Response) => {
  const { id } = req.body;

  let mentor: (Document & MentorSchemaType) | null = null;
  if (id && isValidObjectId(id)) mentor = await MentorModel.findById(id);

  if (!mentor) {
    return res.status(401).json({
      error: 'Mentor Not Found',
    });
  }

  mentor.top_mentor = !mentor.top_mentor;

  await mentor.save();

  await notificationController.notify(
    mentor._id,
    mentor.top_mentor
      ? "Congratulations! You're a top mentor"
      : 'You are not a top mentor anymore',
    mentor.top_mentor
      ? 'You are now a top mentor'
      : 'Sorry, we are not able to make you a top mentor anymore',
  );

  if (mentor.top_mentor) {
    try {
      await sendEmail(
        mentor.email,
        `${APP_NAME} top mentor`,
        makeTemplate('topMentor.hbs', {
          top_mentor: mentor.top_mentor,
          appName: APP_NAME,
          assetFolder: ASSET_FOLDER,
        }),
      );
    } catch (err) {
      return res.status(500).json({
        message: "Email didn't sent",
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Mentor Approved!',
  });
};

const modifyBanner = async (req: Request, res: Response) => {
  const deletePromise = BannerModel.deleteMany({});
  const createPromise = BannerModel.create(req.body);

  try {
    const [banner] = await Promise.all([createPromise, deletePromise]);

    return res.status(200).json({
      success: true,
      banner,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserMeetings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const meetings = await BookingModel.find({
      $or: [{ mentor: id }, { mentee: id }],
    })
      .populate('mentor', 'first_name last_name')
      .populate('mentee', 'first_name last_name');

    return res.status(200).json({ meetings });
  } catch (error) {
    return res.json({ error: error instanceof Error ? error.message : error });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const meetings = await BookingModel.find()
      .populate('mentor', 'first_name last_name')
      .populate('mentee', 'first_name last_name');

    return res.status(200).json({ meetings });
  } catch (error) {
    return res.json({ error: error instanceof Error ? error.message : error });
  }
};

export default {
  adminAuth,
  adminLogin,
  adminVerifyOtp,
  createAdmin,
  adminLogout,
  modifyBanner,
  deleteUser,
  approveMentor,
  changeTopMentorStatus,
  rejectMentor,
  getUserMeetings,
  getAllBookings,
};
