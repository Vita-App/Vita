import express from 'express';
import { PROD } from '../config/keys';
import adminController from '../controllers/admin.controller';
import { fakeDataController } from '../data/fakeData-controller';
import { checkDBUrl } from '../middleware';
import migrate from '../migrations/limit-session-migration';

const router = express.Router();

if (!PROD) {
  router.post('/admin/create', checkDBUrl, adminController.createAdmin);
  router.get('/seed-data', checkDBUrl, fakeDataController);
  router.get('/migrate', checkDBUrl, migrate);
  // router.get('/topicData', topicDataController);
}

export default router;
