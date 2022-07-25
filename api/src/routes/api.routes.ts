import express from 'express';
import apiController from '../controllers/api.controller';

const router = express.Router();

router.get('/check-phone', apiController.isPhoneRegistered);
router.get('/get-users', apiController.getUsers);
router.get('/get-user', apiController.getUser);
router.get('/get-mentor', apiController.getMentor);
router.get('/get-mentor-stats/:id', apiController.getMentorStats);
router.get('/get-mentors', apiController.getMentors);
router.get('/get-topics', apiController.getTopics);
router.get('/get-banner', apiController.getBanner);

export default router;
