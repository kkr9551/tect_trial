import express from 'express';
import { protect } from "../middleware/auth.js";
import { upload } from "../utils/fileUpload.js";
import { createPostQuestion, getPostQuestions, getPostQuestion, deletePostQuestion, updatePostQuestion, getTotalQuestions } from '../controllers/postQuestions.js';

//for post questions, users can
/**
 * post questions 
 * get all posted questions
 * get a posted question
 * update a posted question
 * delete a posted question
 * in their own account pages
 */

const router = express.Router();

router.post("/", protect, upload.single("image"), createPostQuestion);
router.get("/", protect, getPostQuestions);
router.get("/:id", protect, getPostQuestion);
router.delete("/:id", protect, deletePostQuestion);
router.patch("/:id", protect, updatePostQuestion);
router.get("/find", getTotalQuestions);

export default router;