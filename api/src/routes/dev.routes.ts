import express from 'express';
import { PROD } from '../config/keys';
import adminController from '../controllers/admin.controller';
import { fakeDataController } from '../data/fakeData-controller';
import { checkDBUrl } from '../middleware';

const router = express.Router();

if (!PROD) {
  router.post('/admin/create', checkDBUrl, adminController.createAdmin);
  router.get('/seed-data', checkDBUrl, fakeDataController);
  // router.get('/topicData', topicDataController);
}

export default router;
