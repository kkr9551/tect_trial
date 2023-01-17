/**this middleware is used to check if the user is logged in if so the user's
 * access to the profile will be permitted
 */
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401)
            throw new Error("Not authorised, please log in");
        }

        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET /**verify the token with the JWT_SECRET we have set */);

        //get user id from token
        const user = await User
            .findById(verified.id/**this gives all the info stored in the cookie */)
            .select("-password"/**query projection */);
        /**Mongoose model provides state helper functions for CRUD operations
         * these functions return a query object
         * Model.delete/updateMany, Model.delete/updateOne
         * Model.find, Model.findById, ...
         * Model.replaceOne
         * In this link, the query object will be passed in Query.proto.select method
         * It will specify which document field to include or exclude
         * the argument in the first parameter can be objects, strings, and arrays.
         * - prefix flags that path as excluded, + prefix flags that path as included
         */
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(401);
        throw new Error("Not authorised, please log in");
    }
});

/*export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        //verify token 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/