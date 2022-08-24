import { UserModel, MentorModel } from '../Models/User';

const migrate = async () => {
  const txns = [
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

  await Promise.all(txns);
};

export default migrate;
