import { Router } from "express";
const router = Router();
import * as postController from "../controllers/post-controller";
import { handleIsAuthor } from "../controllers/auth-controller";
import { authenticateToken } from "../middleware/jwt";
import { validPost, handleErrors } from "../middleware/error";

router.get("/", postController.handleGetPosts);
router.get("/:id", postController.handleGetPostById);

router.post("/", authenticateToken, handleIsAuthor, validPost, handleErrors, postController.handlePostPost);
router.put("/:id", authenticateToken, handleIsAuthor, validPost, handleErrors, postController.handleUpdatePost);
router.delete("/:id", authenticateToken, handleIsAuthor, postController.handleDeletePost);
router.patch("/:id/toggle", authenticateToken, handleIsAuthor, postController.handleTogglePost);

export default router;