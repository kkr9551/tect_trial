import PostQuestion from "../models/postQuestion.js";
import asyncHandler from "express-async-handler";
import { fileSizeFormatter } from "../utils/fileUpload.js";
import cloudinary from "../utils/cloudinary.js";
//import MarkNum from "../models/markPost.js";
//import ThankNum from "../models/thankPost.js";
//import mongoose from "mongoose";

/**create a question */
export const createPostQuestion = asyncHandler(async (req, res, next) => {
    const {bookname, content} = req.body;

    if (!bookname || !content) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    let fileData = {};
    if (req.file) {
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
                filePath: result.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            };
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    const postQuestion = await PostQuestion.create({
        user: req.user.id,
        bookname,
        content,
        image: fileData,
    });
    res.status(200).json(postQuestion);
});

/**get all questions */
export const getPostQuestions = asyncHandler(async (req, res) => {
    const postQuestions = await PostQuestion.find({user: req.user.id}).sort("-createdAt");
    res.status(200).json(postQuestions);
}); 

/**get a single question */
export const getPostQuestion = asyncHandler(async (req, res) => {
    const postQuestion = await PostQuestion.findById(req.params.id);
    if (!postQuestion) {
        res.status(404);
        throw new Error("Question not found");
    }
    if (postQuestion.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    res.status(200).json(postQuestion);
});

/**delete a question */
export const deletePostQuestion = asyncHandler(async (req, res) => {
    const postQuestion = await PostQuestion.findById(req.params.id);
    if (!postQuestion) {
        res.status(404);
        throw new Error("Question not found");
    }
    if (postQuestion.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    await postQuestion.remove();
    res.status(200).json(postQuestion);
});

/**update a question */
//issue needs repair: uploading image doesn't work if update the former question that doesn't contain the image, 
export const updatePostQuestion = asyncHandler(async (req, res, next) => {
    const {bookname, content} = req.body;
    const {id} = req.params;
    const question = await PostQuestion.findById(id);

    if (!question) {
        res.status(404);
        throw new Error("Question not found");
    }
    if (question.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorised");
    }

    //handle image upload
    let fileData = {};
    if (req.file) {
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
                filePath: result.secure_url,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
            };
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    const updatedQuestion = await PostQuestion.findByIdAndUpdate(
        {_id: id},
        {
            bookname,
            content,
            image: Object.keys(fileData).length === 0 ? question ?. image : fileData,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json(updatedQuestion);
});

/**get all questions regarding questions' owners */
export const getTotalQuestions = asyncHandler(async (req, res) => {
    const totalQuestions = await PostQuestion.find({}).sort("-createdAt");
    res.status(200).json(totalQuestions);
});