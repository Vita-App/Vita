import express from 'express';
import topicsController from '../controllers/topics.controller';

const router = express.Router();
router.get('/get-topics', topicsController.getTopics);

export default router;
