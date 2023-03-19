import PostMessage from "../models/postMessage.js";
//import express from "express";
//import mongoose from "mongoose";
//import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { fileSizeFormatter } from "../utils/fileUpload.js";
//import { v2 as cloudinary } from 'cloudinary';
import cloudinary from "../utils/cloudinary.js";
import MarkNum from "../models/markPost.js";
//import ThankNum from "../models/thankPost.js";
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
            };
            //manage image upload
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    const post = await PostMessage.create({
        user: req.user.id,
        title,
        tags,
        content,
        visibility,
        image: fileData,
    });
    res.status(201).json(post);
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
    let postMessageQuery = {visibility: {$in: query.visibility}};
    const publicPosts = await PostMessage.find(postMessageQuery).sort("-createdAt");
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

/**get all marked posts' shallow copies */
export const getShallowCopies = asyncHandler(async (req, res) => {
    //firstly, get all public posts and all mark number data 
    //secondly, filter mark number data that contains user_id equal to current user id
    //thirdly keep post id; 
    //fourthly, use filtered post id to find posts
    let query = {visibility: "public"};
    let postMessageQuery = {visibility: {$in: query.visibility}};
    //const publicPosts = await PostMessage.find(postMessageQuery);
    let queryMarkNum = {user_id: req.user.id};
    let MarkNumQuery = {user_id: {$in: queryMarkNum.user_id}};
    const markedByMe = await MarkNum.find(MarkNumQuery).select("post_id")/*.filter((obj) => obj.post_id)*/;//notice here, filter, this method cannot be used
    const markedByMeId = markedByMe.map((obj) => obj.post_id);
    const shallowCopies = await PostMessage.find({$and: [postMessageQuery, {_id: markedByMeId}]}).select(["title", "tags"]);
        //.find({$or: [postMessageQuery, {marks: {$exists: true, $ne: []}}]})
        //.find({$and: [postMessageQuery, {marks: {$exists: true, $elemMatch: {$eq: req.user.id}}}]})
        //.select(["title", "tags"]);
    //const shallowCopies = publicPosts.find({marks: {$exists: true, $ne: []}}).select(["title", "tags"]);
    res.status(200).json(shallowCopies);
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
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorised");
    }
    
    await post.remove();
    res.status(200).json(post);
});

/**update post */
export const updatePost = asyncHandler(async (req, res, next) => {
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
            };
            //manage image upload
            
        } catch (error) {
            console.log(error);
            next(error);
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
            //in order to prevent the image that we are not going to update from being deleted,
            //we need to check if the filedata, the object is null (no keys)
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
        /**
         * MarkNum.findOne().then((postMark) => {try{}catach{}})
         */
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

    const post = await PostMessage.findById({_id: post_id});
    if (!post) {
        res.status(404);
        throw new Error({message: "Post not found"});
    } else {
        let current_user = req.user;
        try {
            await PostMessage.findByIdAndUpdate(
                post_id, {$push: {appreciations: current_user._id}}, {new: true}
            );
            res.status(200).json({success: true, message: "Appreciation successfully added", data: {}});
        } catch (error) {
            res.status(400).json(error.message);
        }
        
        /*const postThank = await ThankNum.findOne(
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
        }*/
    }
});

/**cancell appreciation */
export const nonthankPost = asyncHandler(async (req, res) => {
    let post_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(post_id)) {
        res.status(400);
        throw new Error({message: "Invalid post id", data: {}});
    }

    const post = await PostMessage.findById({_id: post_id});
    if (!post) {
        res.status(404);
        throw new Error({message: "Post not found"});
    } else {
        let current_user = req.user;
        try {
            await PostMessage.findByIdAndUpdate(
                post_id, {$pull: {appreciations: current_user._id}}, {new: true}
            );
            res.status(200).json({success: true, message: "Appreciation removed", data: {}});
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
});