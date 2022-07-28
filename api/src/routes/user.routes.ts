import express from 'express';
import userController from '../controllers/user.controller';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.put(
  '/mentor/mentoring-status',
  isAuth,
  userController.changeMentoringStatus,
);

router.get('/like/:mentor_id', isAuth, userController.likeMentor);
router.put('/profile', isAuth, userController.updateProfile);

export default router;
