import mongoose from "mongoose";
import bcrypt from "bcrypt";

const MarkSchema = new mongoose.Schema(
    {
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            //it might be troublesome if we just restrict this modle to post message,
            //we could use dynamic references via refPath
            //ref: "PostMessage",
            refPath: "model_type",
        },
        model_type: {
            type: String,
            enum: ["PostMessage", "PostQuestion"],
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