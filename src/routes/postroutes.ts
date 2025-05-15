import { Router } from "express";
const router = Router();
import * as postController from "../controllers/postcontroller";

router.get("/", postController.handleGetPosts);
router.post("/", postController.handlePostPost);
router.put("/:id", postController.handleUpdatePost);
router.delete("/:id", postController.handleDeletePost);

export default router;