import mongoose from "mongoose";
import bcrypt from "bcrypt";

const MarkSchema = new mongoose.Schema(
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

const MarkNum = mongoose.model('MarkNum', MarkSchema);
export default MarkNum;