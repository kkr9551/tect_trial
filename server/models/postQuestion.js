import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        bookname: {
            type: String,
            required: [true, "If you cannot remember clearly the name of the original, you could input the translation name"],
            trim: true
        },
        content: {
            type: String,
            required: [true, "Please detail your question"],
            trim: true,
        },
        marks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "MarkNumQ",
        }],
        /*appreciations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ThankNumQ",
        }],*/
        image: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true
    }
);

const PostQuestion = mongoose.model('PostQuestion', questionSchema);
export default PostQuestion;