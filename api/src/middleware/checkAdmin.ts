import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AdminModel } from '../Models/Admins';
import { ADMIN_JWT } from '../config/keys';

const verifyAdminToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, ADMIN_JWT.secret) as JwtPayload;
    const admin = await AdminModel.findById(decoded.id);
    return admin;
  } catch (error) {
    return null;
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { adminToken } = req.cookies;
  if (adminToken) {
    const admin = await verifyAdminToken(adminToken);
    if (admin) {
      req.user = admin;
      return next();
    }
  }

  return res.status(401).json({
    error: 'You are not an admin',
  });
};
