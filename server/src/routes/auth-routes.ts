import * as authController from '../controllers/auth-controller';
import { Router } from 'express';
import { validForm, handleErrors } from '../middleware/error';
import { authenticateToken } from '../middleware/jwt';

const router = Router();

router.get("/login",  authenticateToken, authController.handleGetLogin);
router.post("/login", authController.handlePostLogin);
router.get("/users", authController.handleGetUsers);
router.post("/sign-up", validForm, handleErrors, authController.handlePostUser);

export default router;