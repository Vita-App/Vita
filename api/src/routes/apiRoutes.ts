import { Router } from 'express';
import {
  authController,
  logoutController,
  googleController,
  googleRedirectController,
  linkedinController,
  linkedinRedirectController
} from '../controllers/auth-controller';
import {
  getTopicsController,
  getMentorController,
  getMentorsController,
} from '../controllers/api-controller';

import {
  fakeDataController,
  topicDataController,
} from '../data/fakeData-controller';

const router = Router();

// we will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get('/auth', authController);
router.get('/auth/google', googleController);
router.get('/auth/googleCallback', googleRedirectController);
router.get('/auth/linkedin', linkedinController);
router.get('/auth/linkedinCallback', linkedinRedirectController);
router.get('/logout', logoutController); // auth logout

router.get('/get-mentor', getMentorController);
router.get('/get-mentors', getMentorsController);
router.get('/get-topics', getTopicsController);
// router.get('/data', fakeDataController);
// router.get('/topicData', topicDataController);
export default router;
