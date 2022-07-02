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
  getUsersController,
  getUserController,
  approveMentorController,
  rejectController,
  getTopMentorsController,
  changeTopMentorStatusController,
  modifyBanner,
  getBanner,
} from '../controllers/api-controller';

import {
  fakeDataController,
  // topicDataController,
} from '../data/fakeData-controller';
import {
  adminAuthController,
  adminLoginController,
  adminLogoutController,
  adminVerifyOtpController,
  createAdminController,
} from '../controllers/admin-controller';
import { PROD } from '../config/keys';
import { checkAdmin } from '../middleware';
import { checkDBUrl } from '../middleware';
import {
  bookSlot,
  getAvailableSlots,
} from '../controllers/bookings-controller';
const upload = multer({ storage });
const router = Router();

// We will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get('/auth', authController);
router.get('/admin/auth', adminAuthController);
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
router.get('/admin/logout', adminLogoutController); // Auth logout

router.post('/admin/login', adminLoginController);
router.post('/admin/verify-otp', adminVerifyOtpController);

router.get('/get-users', getUsersController);
router.get('/get-user', getUserController);
router.get('/get-mentor', getMentorController);
router.get('/get-mentors', getMentorsController);
router.get('/top-mentors', getTopMentorsController);
router.get('/get-topics', getTopicsController);

// Bookins API
router.get('/availableSlots', getAvailableSlots);
router.post('/bookSlot', bookSlot);

router.put('/approve-mentor', checkAdmin, approveMentorController);
router.get('/reject-mentor', checkAdmin, rejectController);
router.put('/change-topmentor', checkAdmin, changeTopMentorStatusController);

router.post('/modify-banner', checkAdmin, modifyBanner);
router.get('/get-banner', getBanner);

if (!PROD) {
  router.post('/admin/create', checkDBUrl, createAdminController);
  router.get('/seed-data', checkDBUrl, fakeDataController);
  // router.get('/topicData', topicDataController);
}

export default router;
