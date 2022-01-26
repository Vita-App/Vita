import { DATABASE_URL as mongoURI } from './keys';
import { connect } from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    await connect(mongoURI);
    console.log(chalk.grey('MongoDB Connected :D'));
  } catch (err) {
    if (err instanceof Error) console.error(chalk.redBright(err.message));
    process.exit(1);
  }
};

export default connectDB;
