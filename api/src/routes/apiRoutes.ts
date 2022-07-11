import { Router } from 'express';
import { storage } from '../config/cloudinary';
import multer from 'multer';
import {
  authController,
  logoutController,
  jwtSignupController,
  jwtLoginController,
  googleController,
  linkedinController,
  verifyEmailController,
  sendMailController,
  changePasswordController,
  registerUserController,
  passportGoogle,
  passportLinkedin,
  socialAuthCallback,
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
  deleteUser,
  isPhoneRegistered,
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
  availabilityController,
  bookSlotController,
  acceptBookingController
} from '../controllers/bookings-controller';
import { isAuth } from '../middleware/isAuth';
import {
  handleWhatsAppWebHook,
  verifyWebHook,
} from '../controllers/whatsapp-controller';
const upload = multer({ storage });
const router = Router();

// We will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get('/auth', authController);
router.get('/admin/auth', checkAdmin, adminAuthController);
router.post('/send-email', sendMailController);
router.post('/auth/signup', jwtSignupController);
router.post('/auth/login', jwtLoginController);
router.get('/auth/verify-email', verifyEmailController);
router.get('/auth/google', googleController);
router.get('/auth/linkedin', linkedinController);
router.get('/auth/googleCallback', passportGoogle, socialAuthCallback);
router.get('/auth/linkedinCallback', passportLinkedin, socialAuthCallback);
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

router.get('/check-phone', isPhoneRegistered);
router.get('/get-users', getUsersController);
router.get('/get-user', getUserController);
router.get('/get-mentor', getMentorController);
router.get('/get-mentors', getMentorsController);
router.get('/top-mentors', getTopMentorsController);
router.get('/get-topics', getTopicsController);

// Bookins API
router.get('/busySlots', availabilityController);
router.post('/bookSlot', isAuth, bookSlotController);
router.get('/booking/accept/:id',isAuth, acceptBookingController);

router.put('/approve-mentor', checkAdmin, approveMentorController);
router.get('/reject-mentor', checkAdmin, rejectController);
router.put('/change-topmentor', checkAdmin, changeTopMentorStatusController);
router.delete('/delete-user/:id', checkAdmin, deleteUser);

router.post('/modify-banner', checkAdmin, modifyBanner);
router.get('/get-banner', getBanner);

router.route('/webhooks').get(verifyWebHook).post(handleWhatsAppWebHook);

if (!PROD) {
  router.post('/admin/create', checkDBUrl, createAdminController);
  router.get('/seed-data', checkDBUrl, fakeDataController);
  // router.get('/topicData', topicDataController);
}

export default router;
