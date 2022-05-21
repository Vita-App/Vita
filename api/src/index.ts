import connectDB from './config/connectDatabase';
import createServer from './app';
import { port } from './config/keys';
import chalk from 'chalk';
import './Models/User';
import './config/passport-config';
import socketioService from './service/socket-io-service';

const { httpServer } = createServer();

connectDB()
  .then(() => {
    socketioService(httpServer);

    httpServer.listen(port, () =>
      console.log(chalk.blueBright(`Express Server listening to port ${port}`)),
    );
  })
  .catch((err) => {
    console.log(chalk.redBright(err));
    process.exit();
  });
