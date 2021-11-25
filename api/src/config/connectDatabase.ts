import { DATABASE_URL as mongoURI } from './keys';
import { connect } from 'mongoose';
import { grey, redBright } from 'chalk';

const connectDB = async () => {
  try {
    await connect(mongoURI);
    console.log(grey('MongoDB Connected :D'));
  } catch (err) {
    if (err instanceof Error) console.error(redBright(err.message));
    process.exit(1);
  }
};

export default connectDB;
