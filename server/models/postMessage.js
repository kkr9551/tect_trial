import mongoose from "mongoose";

//const {Schema} = mongoose;
//const postSchema = new Schema();
const postSchema = mongoose.Schema(
    {
    //Everthing in mongoose starts with a schema. 
    //Each schema maps to the collection and define the shape of doc.
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Please add the title of the original"],
            trim: true,
        },
        tags: {
            type: [String],
            required: [true, "Please add at least one tag"],
            trim: true,
        },
        image: {
            type: Object,
            default: {},
        },
        content: {
            type: String,
            required: [true, "Please detail your evidence"],
            trim: true,
        },
        visibility: {
            type: String,
            enum: ["public", "private"],
            required: [true, "Please determine the visibility of your evidence"],
            default: "private",
        },
        marks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "MarkNum",
        }],
        questions: {
            type: Number,
            default: 0,
        },
        appreciations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    /**options: configurable options which can be passed to the constructor or the set method */
    {
        timestamps: true
    }
);

const PostMessage = mongoose.model('PostMessage', postSchema);
//when we call this function, mongoose compiles a model from the schema.
//Models intend to create and read documents from the database.

export default PostMessage;