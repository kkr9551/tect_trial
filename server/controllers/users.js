import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import Token from "../models/tokenModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendemail.js";

/**get user data */
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const {_id, name, email, picturePath, cases, selfIntro} = user;
        res.status(200).json({_id, name, email, picturePath, cases, selfIntro});
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

/**get log in status */
export const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json(false);
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
        return res.json(true);
    } else {
        return res.json(false);
    }
});

/**update user */
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const {name, email, picturePath, selfIntro} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.picturePath = req.body.picturePath || picturePath;
        user.selfIntro = req.body.selfIntro || selfIntro;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            picturePath: updatedUser.picturePath,
            cases: updatedUser.cases,
            selfIntro: updatedUser.selfIntro,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

/**change password */
export const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const {oldPassword, password} = req.body;
    if (!user) {
        res.status(400);
        throw new Error("User not found, please sign up first");
    }
    //validate
    if (!oldPassword || !password) {
        res.status(400);
        throw new Error("Please fill in both old and new passwords");
    }

    //check if old password matches password in the database
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    //save new password
    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();
        res.status(200).send("Password change successfully");
    } else {
        res.status(400);
        throw new Error("Old password is incorrect");
    }
});

/**forgot password */
export const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        res.status(404)
        throw new Error("User does not exist");
    }

    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    //console.log(resetToken);
    
    //hash token before saving to DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //console.log(hashedToken);

    //save token to DB
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000),
    }).save();

    //construct reset url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    
    //reset email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid for only 30 minutes</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p>Regards...</p>
        <p>Tect project</p>
    `;

    const subject = "Password reset request"
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({success: true, message: "Reset email sent"});
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

/*export const getUserWitnesses = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id);
        const witnesses = await Promise
            .all(user.witnesses.map((id) => User.findById(id)))
        const formattedWitnesses = witnesses.map(
            ({_id, userName, picturePath}) => {
                return {_id, userName, picturePath}
            }
        );
        res.status(200).json(formattedWitnesses);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}*/