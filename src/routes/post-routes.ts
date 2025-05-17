import { Router } from "express";
const router = Router();
import * as postController from "../controllers/post-controller";
import { handleIsAuthor } from "../controllers/auth-controller";

router.get("/", postController.handleGetPosts);
router.post("/", handleIsAuthor, postController.handlePostPost);
router.put("/:id", handleIsAuthor, postController.handleUpdatePost);
router.delete("/:id", postController.handleDeletePost);

export default router;