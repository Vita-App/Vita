import { Request, Response } from 'express';
import { customAlphabet } from 'nanoid';
import { APP_NAME, ASSET_FOLDER } from '../config/keys';
import { Waitlist } from '../Models/Waitlist';
import { sendEmail } from '../service/email-service';
import { makeTemplate } from '../utils/makeTemplate';
import faker from '@faker-js/faker';

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const nanoidThree = customAlphabet(chars, 3);
const nanoidFour = customAlphabet(chars, 4);

// ? Seeds the waitlist collection in the DB
const seedWaitlist = async (req: Request, res: Response) => {
  const seedEntries = 100;
  const txns = [];

  await Waitlist.deleteMany({});

  for (let i = 0; i < seedEntries; i++) {
    const waitlist = new Waitlist({
      name: faker.name.findName(),
      email: faker.internet.email(),
      inviteCode: `${nanoidThree()}-${nanoidFour()}-${nanoidThree()}`,
    });

    txns.push(waitlist.save());
  }

  try {
    await Promise.all(txns);
    res.send('Seeded waitlist');
  } catch (err) {
    res.status(500).send(err);
  }
};

const joinWaitlist = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  // Checking if user has valid email address
  if (!/^[A-Za-z0-9._%+-]+@thapar.edu$/i.test(email)) {
    return res.status(400).json({
      error: 'You must use a Thapar email address',
    });
  }

  // Checking if user is already in the waitlist
  const alreadyExists = await Waitlist.findOne({ email });
  if (alreadyExists) {
    return res.status(400).json({
      error: 'You are already in the waitlist',
    });
  }

  const inviteCode = `${nanoidThree()}-${nanoidFour()}-${nanoidThree()}`;

  const entry = new Waitlist({ name, email, inviteCode });
  await entry.save();
  res.status(200).json({
    message: 'You have been added to the waitlist',
    success: true,
  });
};

const getWaitlist = async (req: Request, res: Response) => {
  const waitlist = await Waitlist.find();
  res.status(200).json({
    waitlist,
  });
};

const sendInvites = async (req: Request, res: Response) => {
  const limitEntries = 100;

  // Select 100 random entries from the waitlist which have not been invited yet
  const randomEntries = await Waitlist.aggregate([
    { $match: { invited: false } },
    { $sample: { size: limitEntries } },
  ]);

  const txns = [];

  try {
    for (const entry of randomEntries) {
      const { name, email, inviteCode } = entry;
      const template = makeTemplate('invite.hbs', {
        name,
        inviteCode,
        appName: APP_NAME,
        assetFolder: ASSET_FOLDER,
      });

      if (entry.email === 'lalitkumarsingh3716@gmail.com') {
        txns.push(sendEmail(email, 'Invite to join TI MentorShip', template));
      }

      txns.push(Waitlist.findByIdAndUpdate(entry._id, { invited: true }));
    }

    await Promise.all(txns);

    return res.status(200).json({
      message: 'Invites have been sent',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : err,
    });
  }
};

export default {
  seedWaitlist,
  joinWaitlist,
  getWaitlist,
  sendInvites,
};
