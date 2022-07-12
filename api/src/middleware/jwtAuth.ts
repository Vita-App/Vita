import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../Models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT } from '../config/keys';

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT.secret) as JwtPayload;
    const user = await UserModel.findById(decoded.user_id);
    return user;
  } catch (error) {
    return null;
  }
};

export const jwtCookieMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    return next();
  }

  const token = req.cookies.jwt;
  if (token) {
    const user = await verifyToken(token);
    if (user) {
      req.user = user;
    }
  }

  next();
};
