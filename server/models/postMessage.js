import mongoose from "mongoose";

//const {Schema} = mongoose;
//const postSchema = new Schema();
const postSchema = mongoose.Schema(
    {
    //Everthing in mongoose starts with a schema. 
    //Each schema maps to the collection and define the shape of doc.
        userId: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: true
        },
        picturePath: {
            String,
            required: false
        }
        content: {
            type: String,
            required: true
        },
        evidence: {
            type: Number,
            default: 0
        },
    },
    {
        timestamp: true
    }
);

const PostMessage = mongoose.model('PostMessage', postSchema);
//when we call this function, mongoose compiles a model from the schema.
//Models intend to create and read documents from the database.

export default PostMessage;