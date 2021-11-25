import { CLIENT_URL } from '../config/keys';
import express from 'express';
import {
  googleController,
  googleRedirectController,
  loginFailedController,
  githubController,
  githubRedirectController,
  twitterController,
  twitterRedirectController,
} from '../controllers/auth-controller';

const router = express.Router();

// when login failed, send failed msg
router.get('/login/failed', loginFailedController);

// auth with google+
router.get('/google', googleController);
router.get('/google/redirect', googleRedirectController);

router.get('/github', githubController);
router.get('/github/redirect', githubRedirectController);

router.get('/twitter', twitterController);
router.get('/twitter/redirect', twitterRedirectController);

export default router;
