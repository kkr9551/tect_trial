import express from "express";
import { 
    createPost, getPosts, getPost, deletePost, updatePost, getPublicPosts, getPublicStatus, getPublicPost, 
    markPost, thankPost, nonthankPost, getShallowCopies 
} from '../controllers/posts.js';
import { protect } from "../middleware/auth.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router();
//create a modular, mountable route handler. It's a complete middleware and routing system.

/*router.get('/', (req, res) => {
    res.send('This works');
    //this method sends a response of various types.
    //the whole callback function plays a role in the middleware router.
})
*/

/**we also specify the route with files */
router.post("/", protect, upload.single("image"), createPost);
//if you allow users to upload multiple images, it should be upload.array()
router.get("/", protect, getPosts);
router.get("/visibility", getPublicPosts);
router.get("/:id/public", getPublicPost);
router.get("/:id/visibility", getPublicStatus);
router.get("/:id", protect, getPost);
router.get("/visibility/marks", protect, getShallowCopies);
router.delete("/:id", protect, deletePost);
router.patch("/:id", protect, upload.single("image"), updatePost);
router.post("/:id/marked", protect, markPost);
router.put("/:id/thank", protect, thankPost);
router.put("/:id/nonthank", protect, nonthankPost);

//for post questions, users can
/**
 * post questions 
 * get all posted questions
 * get a posted question
 * update a posted question
 * delete a posted question
 * in their own account pages
 */

/*router.post("/question", protect, upload.single("image"), createPostQuestion);
router.get("/question", protect, getPostQuestions);
router.get("/question/:id", protect, getPostQuestion);
router.delete("/question/:id", protect, deletePostQuestion);*/


export default router;