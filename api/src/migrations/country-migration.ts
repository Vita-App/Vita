import { Request, Response } from 'express';
import { UserModel, MentorModel } from '../Models/User';

const migrate = async (req: Request, res: Response) => {
  await Promise.all([
    MentorModel.updateMany(
      {},
      {
        $set: {
          countryCode: 'in',
        },
      },
    ),
  ]);

  return res.json('Migration Successful');
};

export default migrate;
