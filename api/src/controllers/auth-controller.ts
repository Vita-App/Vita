import { CLIENT_URL, EMAIL_VERIFICATION_JWT } from '../config/keys';
import { Request, Response } from 'express';
import { UserModel } from '../Models/User';
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../service/email-service';
import { emailVerificationTemplate } from '../templates';

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
      isLoggedIn: false,
      message: 'User failed to authenticate.',
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      isLoggedIn: false,
      message: 'User failed to authenticate.',
    });
  }

  if (!user.verified) {
    return res.status(401).json({
      isLoggedIn: false,
      message: 'User failed to authenticate.',
    });
  }

  const token = user.issueToken();

  res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
  return res.status(200).json({ isLoggedIn: true, user });
};

export const jwtSignupController = async (req: Request, res: Response) => {
  const { email, password, first_name, last_name } = req.body;

  const user = new UserModel({
    email,
    password,
    first_name,
    last_name,
  });

  const verificationToken = user.createVerificationToken();
  const verificationUrl = `${CLIENT_URL}/email-verification?token=${verificationToken}`;

  const presentUser = await UserModel.findOne({ email });
  if (presentUser) {
    if (presentUser.verified) {
      return res
        .status(401)
        .json({ isLoggedIn: false, error: { email: 'User already exists.' } });
    }

    try {
      const emailId = await sendEmail(
        user.email,
        'Verify your email',
        emailVerificationTemplate(verificationUrl),
      );

      return res.status(201).json({
        success: true,
        emailId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: {
          email: 'Invalid email address',
        },
      });
    }
  }

  await user.save();

  try {
    const emailId = await sendEmail(
      user.email,
      'Verify your email',
      emailVerificationTemplate(verificationUrl),
    );

    return res.status(201).json({
      success: true,
      emailId,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        email: 'Invalid email address',
      },
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

    const user = await UserModel.findById(user_id);

    if (!user) {
      return res.status(401).json({
        isLoggedIn: false,
        message: 'User failed to authenticate.',
      });
    }

    user.verified = true;
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
