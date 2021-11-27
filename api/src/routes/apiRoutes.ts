import { Router } from 'express';
import chalk from 'chalk';
import { nanoid } from 'nanoid';
import {
  authController,
  logoutController,
} from '../controllers/auth-controller';
import { getMentor, getUser } from '../data/index';
import { MentorModel, UserModel } from '../Models/User';

const router = Router();

// we will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get('/auth', authController);
router.get('/logout', logoutController); // auth logout

router.get('/data', async (req, res) => {
  for (let i = 0; i < 100; i++) {
    const id = nanoid();
    const userData = getUser(id);
    const mentorData = getMentor(
      id,
      userData.first_name,
      userData.last_name,
      userData.image_link,
    );
    const user = new UserModel(userData);
    const mentor = new MentorModel(mentorData);
    user.mentor_information = mentor._id;

    await user.save();
    console.log(chalk.cyan('user is Saved in the database'));
    await mentor.save();
    console.log(chalk.cyan('Mentor is Saved in the database'));
  }
});
export default router;
