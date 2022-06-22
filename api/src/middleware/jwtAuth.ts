import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../Models/User';
import { AdminModel } from '../Models/Admins';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ADMIN_JWT, JWT } from '../config/keys';

const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT.secret) as JwtPayload;
    const user = await UserModel.findById(decoded.user_id);
    return user;
  } catch (error) {
    return null;
  }
};

const verifyAdminToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, ADMIN_JWT.secret) as JwtPayload;
    const admin = await AdminModel.findById(decoded.id);
    return admin;
  } catch (error) {
    return null;
  }
};

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  }

  const token = req.cookies.jwt;
  const { adminToken } = req.cookies;

  if (token) {
    const user = await verifyToken(token);
    if (user) {
      req.user = user;
    }
  }

  if (adminToken) {
    const admin = await verifyAdminToken(adminToken);
    if (admin) {
      req.user = admin;
    }
  }

  next();
};
