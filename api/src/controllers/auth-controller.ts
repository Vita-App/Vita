import { CLIENT_URL } from '../config/keys';
import { Request, Response } from 'express';
import { UserModel } from '../Models/User';
import passport from 'passport';

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

export const googleRedirectController = passport.authenticate('google', {
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
  } else {
    return res.status(200).json({
      isLoggedIn: true,
      message: 'User is logged in',
      user: req.user,
      cookies: req.cookies,
    });
  }
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

  const token = await user.issueToken();

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

  await user.save();
  const token = user.issueToken();
  res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
  res.json({
    success: true,
  });
};

export const logoutController = (req: Request, res: Response) => {
  req.logout();
  res.clearCookie('jwt');
  res.send({ message: 'Successfully logged out' });
};
