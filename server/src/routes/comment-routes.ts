import * as commentController from '../controllers/comment-controller';
import { Router } from 'express';
import { authenticateToken } from '../middleware/jwt';
import { validComment, handleErrors } from '../middleware/error';

const router = Router();

// Public Access
router.get("/", commentController.handleGetComments);
router.get("/post/:postId", commentController.handleGetPostComments);

router.get("/:id", commentController.handleGetCommentById);
router.post("/post/:postId", authenticateToken, validComment, handleErrors, commentController.handlePostComment);
router.put("/:id", authenticateToken, validComment, handleErrors, commentController.handleUpdateComment);
router.delete("/:id", authenticateToken, commentController.handleDeleteComment);

export default router;


