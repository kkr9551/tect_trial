import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ThankSchema = new mongoose.Schema(
    {
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostMessage"
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamp: true
    }
);

const ThankNum = mongoose.model('ThankNum', ThankSchema);
export default ThankNum;