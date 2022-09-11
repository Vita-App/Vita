import { UserModel, MentorModel } from '../Models/User';
import { Request, Response } from 'express';

const migrate = async (req: Request, res: Response) => {
  const users = await UserModel.find({}).populate('mentor_information');

  const txns1 = users.map((user) => {
    if (user.mentor_information) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user.avatar = user.mentor_information.avatar;
    }

    return user.save();
  });

  const txns2 = [
    UserModel.updateMany(
      {},
      {
        $set: {
          maxSessionsCanReqPerMonth: 6,
          currentSessionsRequested: 0,
          lastSessionRequested: null,
        },
      },
    ),
    MentorModel.updateMany(
      {},
      {
        $set: {
          maxSessionReqsPerMonth: 5,
          currentSessions: 0,
          currSessionReqs: 0,
          lastSessionReq: null,
        },
      },
    ),
  ];

  await Promise.all([...txns1, ...txns2]);

  res.json('Migration Successful');
};

export default migrate;
