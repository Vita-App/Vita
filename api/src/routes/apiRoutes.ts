import { Router } from 'express';
import {
  authController,
  logoutController,
} from '../controllers/auth-controller';
import {
  executeController,
  creditSpentController,
  fetchProblemsController,
} from '../controllers/execute-controller';

const router = Router();

// we will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get('/auth', authController);
router.get('/logout', logoutController); // auth logout

router.get('/execute', executeController);
router.get('/credit-spent', creditSpentController);
router.get('/fetch-problem', fetchProblemsController);

export default router;
