import express from 'express';
import userController from '../controllers/user.controller';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.put(
  '/mentor/mentoring-status',
  isAuth,
  userController.changeMentoringStatus,
);

export default router;
