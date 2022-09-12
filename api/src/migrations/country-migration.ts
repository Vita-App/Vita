import { Request, Response } from 'express';
import { UserModel, MentorModel } from '../Models/User';

const migrate = async (req: Request, res: Response) => {
  await Promise.all([
    UserModel.updateMany(
      {},
      {
        $set: {
          country: { name: 'India', flag: 'https://flagcdn.com/in.svg' },
        },
      },
    ),
    MentorModel.updateMany(
      {},
      {
        $set: {
          country: { name: 'India', flag: 'https://flagcdn.com/in.svg' },
        },
      },
    ),
  ]);

  return res.json('Migration Successful');
};

export default migrate;
