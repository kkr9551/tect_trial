import express from 'express';
import { getUser, loginStatus, updateUser, changePassword, forgotPassword } from "../controllers/users.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**read use info */
router.get('/getuser', protect, getUser);
//router.get('/:id/friends', verifyToken, getUserWitnesses);
router.get('/loggedin', loginStatus);
router.patch('/updateuser', protect, updateUser);
router.patch('/changepassword', protect, changePassword);
router.post('/forgotpassword', forgotPassword);

export default router; 