import { CLIENT_URL, EMAIL_VERIFICATION_JWT } from '../config/keys';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { UserModel, MentorModel } from '../Models/User';
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken';
import sendVerificationMail from '../utils/sendVerificationMail';
import { sendEmail } from '../service/email-service';
import { makeTemplate } from '../templates';
import parseFormData from '../utils/parseFormData';
import { SelectOption, UserSchemaType } from '../types';

export const loginFailedController = (req: Request, res: Response) => {
  res.status(401).json({
    isLoggedIn: false,
    message: 'user failed to authenticate.',
  });
};

export const googleController = (req: Request, res: Response) => {
  const isMentor = req.query.isMentor?.toString() === 'true' ? 'true' : 'false';

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: isMentor,
  })(req, res);
};

export const linkedinController = (req: Request, res: Response) => {
  const isMentor = req.query.isMentor?.toString() === 'true' ? 'true' : 'false';

  passport.authenticate('linkedin', {
    state: isMentor,
  })(req, res);
};

export const googleRedirectController = passport.authenticate('google', {
  successRedirect: `${CLIENT_URL}/`,
  failureRedirect: '/login/failed',
});

export const linkedinRedirectController = passport.authenticate('linkedin', {
  successRedirect: `${CLIENT_URL}/`,
  failureRedirect: '/login/failed',
});

export const authController = (req: Request, res: Response) => {
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

export const jwtLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      isLoggedIn: false,
      message: 'Invalid credentials',
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      isLoggedIn: false,
      message: 'Invalid credentials',
    });
  }

  if (!user.verified) {
    return sendVerificationMail(res, user);
  }

  const token = user.issueToken();

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return res.status(200).json({ isLoggedIn: true, user });
};

export const jwtSignupController = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name, mentor } = req.body;

  const user = new UserModel({
    email,
    password,
    first_name,
    last_name,
    is_mentor: mentor,
  });

  const presentUser = await UserModel.findOne({ email });
  if (presentUser) {
    if (presentUser.verified) {
      return res
        .status(401)
        .json({ isLoggedIn: false, error: { email: 'User already exists.' } });
    }

    return await sendVerificationMail(res, presentUser);
  }

  await user.save();

  return await sendVerificationMail(res, user);
};

export const changePasswordController = async (req: Request, res: Response) => {
  const token = req.body?.token;

  try {
    const { user_id } = jwt.verify(
      token,
      EMAIL_VERIFICATION_JWT.secret,
    ) as JwtPayload;

    const user = await UserModel.findOne({
      $and: [{ _id: user_id }, { token }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        isLoggedIn: false,
        message: 'Invalid credentials',
      });
    }

    const { password, confirmPassword } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: {
          password: 'Password is required.',
        },
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        error: {
          confirmPassword: 'Confirm password is required.',
        },
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: {
          confirmPassword: 'Passwords do not match.',
        },
      });
    }

    user.password = password;
    user.token = '';
    await user.save();

    return res.status(200).json({
      success: true,
      isLoggedIn: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      isLoggedIn: false,
      message: 'Invalid token',
    });
  }
};

export const verifyEmailController = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  try {
    const { user_id } = jwt.verify(
      token,
      EMAIL_VERIFICATION_JWT.secret,
    ) as JwtPayload;

    const user = await UserModel.findOne({
      $and: [{ _id: user_id }, { token }],
    });

    if (user?.verified === true) {
      return res.status(200).json({
        success: true,
      });
    }

    if (!user) {
      return res.status(401).json({
        isLoggedIn: false,
        message: 'Invalid Token',
      });
    }

    user.verified = true;
    // user.token = '';
    await user.save();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(401).json({
      isLoggedIn: false,
      message: 'Invalid token.',
    });
  }
};

export const sendMailController = async (req: Request, res: Response) => {
  const { email, template } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  if (template === 'verification') {
    return await sendVerificationMail(res, user);
  }

  if (template === 'reset') {
    const verificationToken = user.createVerificationToken();
    const url = `${CLIENT_URL}/reset-password?token=${verificationToken}`;

    try {
      const emailId = await sendEmail(
        email,
        'Reset Your Password',
        makeTemplate('forgotPassword.hbs', { url }),
      );

      return res.status(200).json({
        success: true,
        emailId,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error sending email',
      });
    }
  }

  return res.status(400).json({
    message: 'Invalid template',
  });
};

export const logoutController = (req: Request, res: Response) => {
  req.logout();
  res.clearCookie('jwt');
  req.session.destroy((err) => {
    if (!err) {
      res.status(200).clearCookie('connect.sid', { path: '/' });
      res.json({
        success: true,
      });
    } else {
      console.log(err);
    }
  });
};

export const registerUserController = async (req: Request, res: Response) => {
  const data = parseFormData(req.body);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'You are not logged in',
    });
  }

  const user = req.user as Document & UserSchemaType;

  user.first_name = data.first_name;
  user.last_name = data.last_name;
  user.interests = data.interests;
  user.avatar = {
    url: req.file?.path,
    filename: req.file?.filename,
  };
  user.graduation_year = data.graduation_year;
  user.stream = data.stream?.value;
  user.phone = data.phone;
  user.bio = data.bio;

  if (user.is_mentor) {
    const mentor = new MentorModel({
      ...user.toObject(),
      time_slots: data.timeSlots,
      experiences: data.experiences,
      topics: data.topics?.map((topic: SelectOption) => topic.value),
      expertise: data.expertise?.map(
        (expertise: SelectOption) => expertise.value,
      ),
      languages: data.languages?.map(
        (language: SelectOption) => language.value,
      ),
      linkedIn: data.linkedin,
      twitter: data.twitter,
    });

    await mentor.save();

    user.mentor_information = mentor._id;
  }

  user.signup_completed = true;
  await user.save();

  return res.json({
    success: true,
  });
};
