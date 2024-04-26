import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary';
import authController from '../controllers/auth.controller';
import { limiter } from '../middleware/rateLimiter';

const upload = multer({ storage });
const router = express.Router();

router.get('/auth', authController.auth);
router.post('/auth/signup', authController.jwtSignup);
router.post('/auth/login', authController.jwtLogin);
router.get('/auth/verify-email', authController.verifyEmail);
router.get('/auth/google', authController.googleCallback);
router.get('/get-refresh-token', authController.googleRefreshToken);
router.post('/send-email', limiter, authController.sendMail);
router.get('/auth/linkedin', authController.linkedinCallback);
router.get(
  '/auth/googleCallback',
  authController.passportGoogle,
  authController.socialAuthCallback,
);
router.get(
  '/auth/linkedinCallback',
  authController.passportLinkedin,
  authController.socialAuthCallback,
);
router.post(
  '/register',
  upload.single('profilePicture'),
  authController.registerUser,
);
router.post('/reset-password', authController.changePassword);
router.get('/logout', authController.logout);

export default router;
