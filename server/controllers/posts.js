import PostMessage from "../models/postMessage.js";
import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

/**get all posts */
export const getPosts = async(req, res) => {
    //res.send('This works');
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await PostMessage.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**get a user's posts */
export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const postMessage = await PostMessage.find({userId});
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

/**create a post */
export const createPost = async(req, res) => {
    //res.send('Creation'); 
    //the property of req. req.body contains pairs of data submitted in the req body;
    //its default value is undefined. It is populated when you use the body-parser middleware.
    try {
        //var newPost = await newPost.save();
        const {userId, title, tags, content, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new PostMessage({
            userId,
            userName,
            title,
            tags,
            picturePath,
            userPicturePath: user.picturePath,
            content,
            evidence
        });
        await newPost.save();

        //fetching all the posts
        const post = await PostMessage.find();

        res.status(201),json(post); 
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};


/*
export const updatePost = async(req, res) => {
    const {id: _id} = req.params;
    const post= req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id. ");
    } else {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
        return res.json(updatedPost);
    }
};

export const deletePost = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id. ");
    } else {
        await PostMessage.findByIdAndRemove(id);
        console.log('DELETE!');
        res.json({message: 'Post deleted successfully! '});
    }
};

export const likePost = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id. ");
    } else {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});
        res.json(updatedPost);
    }
};*/