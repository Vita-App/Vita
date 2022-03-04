import { DATABASE_URL as mongoURI } from './keys';
import { connect } from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const connection = await connect(mongoURI);
    console.log(chalk.grey('MongoDB Connected :D'));
    return connection;
  } catch (err) {
    if (err instanceof Error) console.error(chalk.redBright(err.message));
    process.exit(1);
  }
};

export default connectDB;
