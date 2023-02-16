import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            min: 5,
            max: 50,
            //mongoose has built-in validators. the Num has min and max; the string has enum, match, minLength, and maxLength
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            maxLength: 50,
            unique: true, //it is not a validator but a helper for building MongoDB unique indexes
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid emaial"/**customise error message */
            ],
        },
        password: {
            type: String,
            required: true,
            minLength: 7,
        },
        picturePath: {
            type: String,
            required: [true, "Please add a photo"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png",
        }, 
        selfIntro: {
            type: String,
            maxLength: [300, "Self introduction must not be more than 300 characters"],
            default: "I am ...",
        },
        cases: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);


//The second way: encrypt the password before storing it in the database
UserSchema.pre("save", async function (next) {
    //the edit profiile page don't contain the option to change the password, so we also need to specify the situation when users need to reset password
    if(!this.isModified("password")) {
        return next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    //since the password is just a property of the user object before encrypting and storing in the database 
    //we need to use this to specify this property in this file
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
})


const User = mongoose.model('User', UserSchema);

export default User;