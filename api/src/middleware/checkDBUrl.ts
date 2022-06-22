import { DATABASE_URL } from '../config/keys';
import url from 'url';
import { NextFunction, Request, Response } from 'express';

export const checkDBUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // eslint-disable-next-line node/no-deprecated-api
  const { hostname } = url.parse(DATABASE_URL, true);

  if (hostname !== 'localhost')
    return res.status(406).json({
      message: 'DANGER!',
    });

  next();
};
