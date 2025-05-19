import * as authController from '../controllers/auth-controller';
import { Router } from 'express';
import { validForm, handleErrors } from '../middleware/error';

const router = Router();

router.get("/users", authController.handleGetUsers);
router.post("/sign-up", validForm, handleErrors, authController.handlePostUser);
router.post("/login", authController.handleGetLogin);

export default router;