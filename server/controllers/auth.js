import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/User.js"; /**We import the model here and  */
import asyncHandler from "express-async-handler"; //use it to make async function more concise, without the need for a try-catch block

//generate tokens
//token is used for info exchange, authentication and authorisation
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

/**register users */
export const register = asyncHandler(async (req, res) => {
    
    const {
        name,
        email,
        password, 
    } = req.body;

        //validation
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please fill in all required fields.");
        }
        if (name.length < 4) {
            res.status(400);
            throw new Error("Password must be up to 5 characters");
        }
        if (password.length < 7) {
            res.status(400);
            throw new Error("Password must be up to 8 characters");
        }

        /**check if the user already exists in the database, use await User.findOne() method*/
        const alreadyRegistered = await User.findOne({email});
        if (alreadyRegistered) {
            res.status(400);
            throw new Error("Email has already been registered.");
        }

        //the first way to encrypt the password
        //the first method: encrypt the password before saving it to the database
        //const salt = await bcrypt.genSalt(10);
        //genSalt this method stands for generating a salt, the random string.
        //in this function the first parameter is the saltRounds value, the second param is a callback function of error and returned salt
        //bcrypt(saltRounds, fun(err, salt) {})
        //const passwordHash = await bcrypt.hash(password, salt);

        /**if all conditions are met, we create a new user using await User.create method */
        const user = await User.create({
            name,
            email,
            password, 
        }); 

        const token = generateToken(user._id)

        //send HTTP-only cookie
        //res.cookie method is used for setting the cookie name to value
        res.cookie("token", token, {
            path: "/", //the path to where the cookie is stored
            expires: new Date(Date.now() + 1000 * 86400), //it defines the expiry time of the cookie in the GMT format
            sameSite: "none", //means client and server can both have different URLs 
            httpOnly: true, //this boolean param flags the cookie to be only used in the web server.
            secure: true, //this marks the cookie to be used only in the HTTPS
        });

        if (user) {
            const {_id, name, email, picturePath, cases} = user;
            res.status(201).json({
                _id, name, email, picturePath, cases, token
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
});

/**log in */
export const login = asyncHandler(async (req, res) => {

        const { email, password } = req.body;

        //the first step is to require users to input required info
        if (!email || !password) {
            res.status(400);
            throw new Error("Please enter your email and password");
        }

        //check if the user exists
        const user = await User.findOne({email: email});
        if (!user) {
            res.status(400).json({msg: 'User not found, please sign up'});
        }

        //user exists, check if the user's password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);

        res.cookie("token", token, {
            path: "/",
            sameSite: "none",
            expires: new Date(Date.now() + 1000 * 86400),
            httpOnly: true,
            secure: true,
        });

        if (isMatch && user) {
            const {_id, name, email, picturePath, cases} = user;
            res.status(200).json({
                _id, name, email, picturePath, cases, token
            });
        } else {
            res.status(400);
            throw new Error('Invalid email or password');
        }
});

/**log out */
export const logout = asyncHandler( async (req, res) => {
    res.cookie("token", "", { 
        path: "/",
        expires: new Date(0),
        sameSite: "none",
        httpOnly: true,
        secure: true,
    });
    res.status(200).json({msg: 'Logged out'});
});

