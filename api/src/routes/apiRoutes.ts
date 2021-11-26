import { Router } from 'express';
import { nanoid } from 'nanoid';
import {
  authController,
  logoutController,
} from '../controllers/auth-controller';
import {
  executeController,
  creditSpentController,
  fetchProblemsController,
} from '../controllers/execute-controller';
import { getMentor, getUser } from '../data/index';

const router = Router();

// we will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get('/auth', authController);
router.get('/logout', logoutController); // auth logout

router.get('/execute', executeController);
router.get('/credit-spent', creditSpentController);
router.get('/fetch-problem', fetchProblemsController);

router.get('/data', (req, res) => {
  const id = nanoid();
  const user = getUser(id);
  const mentor = getMentor(
    id,
    user.first_name,
    user.last_name,
    user.image_link,
  );

  res.json([user, mentor]);
});
export default router;
