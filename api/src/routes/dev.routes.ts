import express from 'express';
import { PROD } from '../config/keys';
import adminController from '../controllers/admin.controller';
import waitlistController from '../controllers/waitlist.controller';
import { fakeDataController } from '../data/fakeData-controller';
import { checkDBUrl } from '../middleware';
import migrate from '../migrations/country-migration';

const router = express.Router();

if (!PROD) {
  router.get('/seed-waitlist', checkDBUrl, waitlistController.seedWaitlist);
  router.post('/admin/create', checkDBUrl, adminController.createAdmin);
  router.get('/seed-data', checkDBUrl, fakeDataController);
  router.get('/migrate', checkDBUrl, migrate);
  // router.get('/topicData', topicDataController);
}

export default router;
