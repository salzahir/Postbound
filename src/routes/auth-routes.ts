import * as authController from '../controllers/auth-controller';
import { Router } from 'express';

const router = Router();

router.post("/sign-up", authController.handlePostUser);
router.post("/login", authController.handleGetLogin);

export default router;