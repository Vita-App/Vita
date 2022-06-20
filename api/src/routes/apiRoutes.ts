import { Router } from 'express';
import { storage } from '../config/cloudinary';
import multer from 'multer';
import {
  authController,
  logoutController,
  jwtSignupController,
  jwtLoginController,
  googleController,
  googleRedirectController,
  linkedinController,
  linkedinRedirectController,
  verifyEmailController,
  sendMailController,
  changePasswordController,
  registerUserController,
} from '../controllers/auth-controller';
import {
  getTopicsController,
  getMentorController,
  getMentorsController,
} from '../controllers/api-controller';

import {
  fakeDataController,
  // topicDataController,
} from '../data/fakeData-controller';
const upload = multer({ storage });
const router = Router();

// We will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get('/auth', authController);
router.post('/send-email', sendMailController);
router.post('/auth/signup', jwtSignupController);
router.post('/auth/login', jwtLoginController);
router.get('/auth/verify-email', verifyEmailController);
router.get('/auth/google', googleController);
router.get('/auth/googleCallback', googleRedirectController);
router.get('/auth/linkedin', linkedinController);
router.get('/auth/linkedinCallback', linkedinRedirectController);
router.post(
  '/register',
  upload.single('profilePicture'),
  registerUserController,
);
router.post('/reset-password', changePasswordController);
router.get('/logout', logoutController); // Auth logout

router.get('/get-mentor', getMentorController);
router.get('/get-mentors', getMentorsController);
router.get('/get-topics', getTopicsController);
router.get('/seed-data', fakeDataController);
// router.get('/topicData', topicDataController);
export default router;
