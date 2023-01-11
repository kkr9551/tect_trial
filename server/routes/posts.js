import express from "express";
import { getPosts, getUserPosts, getPost, createPost } from '../controllers/posts.js';
import { protect } from "../middleware/auth.js";

const router = express.Router();
//create a modular, mountable route handler. It's a complete middleware and routing system.

/*router.get('/', (req, res) => {
    res.send('This works');
    //this method sends a response of various types.
    //the whole callback function plays a role in the middleware router.
})
*/

router.get('/', protect, getPosts);
router.get('/:userId', protect, getUserPosts);
router.get('/:id', protect, getPost);

export default router;