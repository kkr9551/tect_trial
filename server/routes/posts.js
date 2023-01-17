import express from "express";
import { createPost, getPosts, getPost, deletePost, updatePost } from '../controllers/posts.js';
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
router.get("/", protect, getPosts);
router.get("/:id", protect, getPost);
router.delete("/:id", protect, deletePost);
router.patch("/:id", protect, upload.single("image"), updatePost);

export default router;