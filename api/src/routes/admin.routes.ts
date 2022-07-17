import express from 'express';
import { adminController } from '../controllers';
import { checkAdmin } from '../middleware';

const router = express.Router();

router.get('/admin/auth', checkAdmin, adminController.adminAuth);
router.get('/admin/logout', adminController.adminLogout);
router.post('/admin/login', adminController.adminLogin);
router.post('/admin/verify-otp', adminController.adminVerifyOtp);

router.put('/approve-mentor', checkAdmin, adminController.approveMentor);
router.get('/reject-mentor', checkAdmin, adminController.rejectMentor);
router.put(
  '/change-topmentor',
  checkAdmin,
  adminController.changeTopMentorStatus,
);
router.delete('/delete-user/:id', checkAdmin, adminController.deleteUser);
router.post('/modify-banner', checkAdmin, adminController.modifyBanner);

export default router;
