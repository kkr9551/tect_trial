import PostMessage from "../models/postMessage.js";
//import express from "express";
//import mongoose from "mongoose";
//import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { fileSizeFormatter } from "../utils/fileUpload.js";
//import { v2 as cloudinary } from 'cloudinary';

/**create a post */
export const createPost = asyncHandler(async (req, res) => {
    const {title, tags, content} = req.body;

    //validation
    if (!title || !tags || !content) {
        res.status(400)
        throw new Error("Please fill in all required fields");
    }

    /**handle image upload */
    let fileData = {};
    if (req.file) {
        //save file to cloudinary before handling image upload
        /*let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(
                req.file.path, {folder: "Tect", resource_type: "image"}); 
        } catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }*/

        fileData = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }

    //manage image upload
    const post = await PostMessage.create({
        user: req.user.id,
        title,
        tags,
        content,
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
    res.status(200).json(post);
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

/**update post */
export const updatePost = asyncHandler(async (req, res) => {
    const {title, tags, content} = req.body;
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
            category,
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