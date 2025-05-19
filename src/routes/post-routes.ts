import { Router } from "express";
const router = Router();
import * as postController from "../controllers/post-controller";
import { handleIsAuthor } from "../controllers/auth-controller";
import { authenticateToken } from "../middleware/jwt";

router.get("/", postController.handleGetPosts);

router.post("/", authenticateToken, handleIsAuthor, postController.handlePostPost);
router.put("/:id", authenticateToken, handleIsAuthor, postController.handleUpdatePost);
router.delete("/:id", authenticateToken, handleIsAuthor, postController.handleDeletePost);
router.patch("/:id/toggle", authenticateToken, handleIsAuthor, postController.handleTogglePost);

export default router;