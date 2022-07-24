import { DATABASE_URL as mongoURI } from './keys';
import { connect } from 'mongoose';
import chalk from 'chalk';
// import { MentorModel } from '../Models/User';

const connectDB = async () => {
  try {
    const connection = await connect(mongoURI);
    console.log(chalk.grey('MongoDB Connected :D'));
    // await MentorModel.syncIndexes();
    return connection;
  } catch (err) {
    if (err instanceof Error) console.error(chalk.redBright(err.message));
  }
};

export default connectDB;
