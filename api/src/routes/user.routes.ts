import express from 'express';
import multer from 'multer';
import userController from '../controllers/user.controller';
import { isAuth } from '../middleware/isAuth';
import { storage } from '../config/cloudinary';

const router = express.Router();
const upload = multer({ storage });

router.put(
  '/mentor/mentoring-status',
  isAuth,
  userController.changeMentoringStatus,
);

router.get('/like/:mentor_id', isAuth, userController.likeMentor);
router.put('/profile', isAuth, userController.updateProfile);
router.put('/update-mentor-slots', isAuth, userController.updateMentorSlots);
router.put(
  '/profile-pic',
  isAuth,
  upload.single('profilePic'),
  userController.updateProfilePic,
);

export default router;
