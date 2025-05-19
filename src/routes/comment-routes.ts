import * as commentController from '../controllers/comment-controller';
import { Router } from 'express';
import { authenticateToken } from '../middleware/jwt';

const router = Router();

// Public Access
router.get("/", commentController.handleGetComments);
router.get("/:id", commentController.handleGetCommentById);

router.post("/", authenticateToken,  commentController.handlePostComment);
router.put("/:id", authenticateToken, commentController.handleUpdateComment);
router.delete("/:id", authenticateToken, commentController.handleDeleteComment);

export default router;