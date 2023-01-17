import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


/**get user data */
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const {_id, name, email, picturePath, cases} = user;
        res.status(200).json({_id, name, email, picturePath, cases});
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
        const {name, email, picturePath} = user;
        user.email = email;
        user.name = req.body.name || name;
        user.picturePath = req.body.picturePath || picturePath;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            picturePath: updatedUser.picturePath, 
            cases: updatedUser.cases,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
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