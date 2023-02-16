import PostMessage from "../models/postMessage.js";
//import express from "express";
//import mongoose from "mongoose";
//import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { fileSizeFormatter } from "../utils/fileUpload.js";
//import { v2 as cloudinary } from 'cloudinary';
import cloudinary from "../utils/cloudinary.js";
import MarkNum from "../models/markPost.js";
import ThankNum from "../models/thankPost.js";
import mongoose from "mongoose";

/**create a post */
export const createPost = asyncHandler(async (req, res, next) => {
    const {title, tags, content, visibility} = req.body;

    //validation
    if (!title || !tags || !content || !visibility) {
        res.status(400)
        throw new Error("Please fill in all required fields");
    }

    /**handle image upload */
    let fileData = {};
    if (req.file) {
        //save file to cloudinary before handling image upload
        try {
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "Tect", 
                    resource_type: "image"
                }
            );
            fileData = {
                fileName: req.file.originalname,
                filePath: /*req.file.path*/result.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            }
            //manage image upload
            const post = await PostMessage.create({
                user: req.user.id,
                title,
                tags,
                content,
                visibility,
                image: fileData,
            });
            res.status(201).json(post);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
});

/**get all posts */
export const getPosts = asyncHandler(async (req, res) => {
    const posts = await PostMessage
        .find({user: req.user.id})
        .sort("-createdAt"); //sort all the posts in an ascending order
    res.status(200).json(posts);
});

/**get a single post */
export const getPost = asyncHandler(async (req, res) => {
    const post = await PostMessage.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    //match post to its user
    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    //check if the post's visibility is private
    /*if (post.visibility === "private") {
        
    }*/
    res.status(200).json(post);
});

/**get public posts */
/*export const getPublicPosts = asyncHandler(async (req, res,) => {
    const publicPosts = await PostMessage
        .find({visibility: "public"})
        .sort("-createdAt");
    res.status(200).json(publicPosts);
});*/

export const getPublicPosts = asyncHandler(async (req, res) => {
    let query = {visibility: "public"};
    let postMessageQuery = {visibility: {$in: query.visibility}}
    const publicPosts = await PostMessage
        .find(postMessageQuery)
        .sort("-createdAt");
    res.status(200).json(publicPosts);
})

/**get a public post */
export const getPublicPost = asyncHandler(async (req, res) => {
    const post = await PostMessage.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    if (post.visibility === "public") {
        res.status(200);
        return res.json(post);
    }
    if (post.visibility === "private") {
        res.status(400);
        throw new Error("Sorry, this evidence now is unavailable. It might be either private or deleted");
    }
});

/**get a post's visibility status */
export const getPublicStatus = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const post = await PostMessage.findById(id)
    if (post.visibility === "public") {
        return res.json(true);
    } 
    if (post.visibility === "private") {
        return res.json(false);
    }
});

/**delete a post */
export const deletePost = asyncHandler(async (req, res) => {
    const post = await PostMessage.findById(req.params.id);
    if (!post) {
        res.status(401);
        throw new Error("Post not found");
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorised");
    }
    
    await post.remove();
    res.status(200).json(post);
});

/**publicise a post */
/*export const publicisePost = asyncHandler(async (req, res) => {
    const {id} = req.params.id;
    const post = await PostMessage.findById(id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    if (post.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error('User not authorized');
    }

    const publicisedPost = await PostMessage.findOneAndUpdate(
        {_id: id},
        {
            "$set":{"publicStatus":true}
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json(publicisedPost);
})*/

/**update post */
export const updatePost = asyncHandler(async (req, res) => {
    const {title, tags, content, visibility} = req.body;
    const {id} = req.params;
    const post = await PostMessage.findById(id);
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    if (post.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error('User not authorized');
    }

    //handle image upload
    let fileData = {};
    if (req.file) {
        fileData = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }

    //update
    const updatedPost = await PostMessage.findByIdAndUpdate(
        {_id: id},
        {
            title,
            tags,
            content,
            visibility,
            image: /*fileData || post.image*/ Object.keys(fileData).length === 0 ?
                post ?. image : fileData,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json(updatedPost);
});

/**mark a post */
export const markPost = asyncHandler(async (req, res) => {
    let post_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(post_id)) {
        res.status(400);
        throw new Error({message: "Invalid post id", data: {}});
    }

    const post = await PostMessage.findById({_id: post_id});
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    } else {
        let current_user = req.user;
        const postMark = await MarkNum.findOne({
            post_id: post_id,
            user_id: current_user._id
        });
        try {
            if (!postMark) {
                let postMarkDoc = new MarkNum({
                    post_id: post_id,
                    user_id: current_user._id
                });
                let markData = await postMarkDoc.save();
                
                await PostMessage.updateOne(
                    {_id: post_id},
                    {$push: {marks: markData._id}}
                );
                res.status(200).json({success: true, message: "Mark successfully added", data: {}});
            } else {
                await MarkNum.deleteOne({
                    _id: postMark._id 
                });
                await MarkNum.updateOne(
                    {_id: postMark.post_id},
                    {$pull: {marks: postMark._id}}
                );
                await PostMessage.updateOne(
                    {_id: post_id},
                    {$pull: {marks: postMark._id}}
                );
                res.status(200).json({success: true, message: "Mark successfully removed", data: {}});
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
});

/**appreciate a post */
export const thankPost = asyncHandler(async (req, res) => {
    let post_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(post_id)) {
        res.status(400);
        throw new Error({message: "Invalid post id", data: {}});
    }

    const post = await PostMessage.findById({id: post_id});
    if (!post) {
        res.status(404);
        throw new Error({message: "Post not found"});
    } else {
        let current_user = req.user;
        const postThank = await ThankNum.findOne(
            {
                post_id: post_id,
                user_id: current_user._id
            }
        );
        try {
            if (!postThank) {
                let postThankDoc = new ThankNum({
                    post_id: post_id,
                    user_id: current_user._id
                });
                let thankData = await postThankDoc.save();
                await PostMessage.updateOne(
                    {_id: post_id,},
                    {$push: {marks: thankData._id}}
                );
                res.status(200).json({success: true, message: "Appreciation successfully added", data: {}}); 
            } else {
                await ThankNum.deleteOne({
                    _id: postThank._id
                });
                await ThankNum.updateOne(
                    {_id: postThank.post_id},
                    {$pull: {marks: postThank._id}}
                );
                await PostMessage.updateOne(
                    {_id: post_id},
                    {$pull: {marks: postThank._id}}
                );
                res.status(200).json({success: true, message: "Appreciation successfully removed", data: {}});
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
});

/*export const likePost = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id. ");
    } else {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});
        res.json(updatedPost);
    }
};*/