import express from 'express';
import webhooksController from '../controllers/webhooks.controller';

const router = express.Router();

router
  .route('/webhooks')
  .get(webhooksController.verifyWebHook)
  .post(webhooksController.handleWhatsAppWebHook);

export default router;
