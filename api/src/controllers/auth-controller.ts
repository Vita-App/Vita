import { CLIENT_URL } from '../config/keys';
import { Request, Response } from 'express';
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
    scope: ['profile'],
    state: isMentor,
  })(req, res);
};

export const googleRedirectController = passport.authenticate('google', {
  successRedirect: `${CLIENT_URL}`,
  failureRedirect: '/login/failed',
});

export const githubController = (req: Request, res: Response) => {
  passport.authenticate('github', {
    scope: ['profile'],
  });
};

export const githubRedirectController = passport.authenticate('github', {
  successRedirect: `${CLIENT_URL}`,
  failureRedirect: '/login/failed',
});

export const twitterController = (req: Request, res: Response) => {
  const isMentor = req.query.isMentor?.toString() === 'true' ? 'true' : 'false';
  passport.authenticate('twitter', {
    scope: ['profile'],
    state: isMentor,
  });
};

export const twitterRedirectController = passport.authenticate('twitter', {
  successRedirect: `${CLIENT_URL}`,
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

export const logoutController = (req: Request, res: Response) => {
  req.logout();
  res.send({ message: 'Successfully logged out' });
};
