import express from 'express';
import { getUser, loginStatus } from "../controllers/users.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**read use info */
router.get('/getuser', protect, getUser);
//router.get('/:id/friends', verifyToken, getUserWitnesses);
router.get('/loggedin', loginStatus);

export default router; 