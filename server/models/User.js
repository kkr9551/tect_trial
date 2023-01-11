import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
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
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial"/**customise error message */],
        },
        password: {
            type: String,
            required: true,
            minLength: 7,
        },
        picturePath: {
            type: String,
            default: "",
        }, 
        cases: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

/*
The second way to encrypt the password before storing it in the database
userSchema.pre("save", async function (next) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
})
*/

const User = mongoose.model('User', UserSchema);

export default User;