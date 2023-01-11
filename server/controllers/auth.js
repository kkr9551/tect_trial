import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; /**We import the model here and  */

//generate tokens
//token is used for info exchange, authentication and authorisation
//
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

/**register users */
export const register = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
            picturePath, 
        } = req.body;

        //validation
        if (!userName || !email || !password) {
            res.status(400);
            throw new Error("Please fill in all required fields.");
        }
        if (userName.length < 5) {
            res.status(400);
            throw new Error("Password must be up to 6 characters");
        }
        if (password.length < 7) {
            res.status(400);
            throw new Error("Password must be up to 6 characters");
        }

        const alreadyRegistered = await User.findOne({email});
        if (alreadyRegistered) {
            res.status(400);
            throw new Error("Email has already been registered.");
        }

        //encrypt the password
        //the first method: encrypt the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        //genSalt this method stands for generating a salt, the random string.
        //in this function the first parameter is the saltRounds value, the second param is a callback function of error and returned salt
        //bcrypt(saltRounds, fun(err, salt) {})
        const passwordHash = await bcrypt.hash(password, salt);

        /**create a new user */
        const newUser = new User({
            userName,
            email,
            password: passwordHash,
            picturePath, 
            cases: 0
        }); 

        const token = generateToken(newUser._id)

        //send HTTP-only cookie
        //res.cookie method is used for setting the cookie name to value
        res.cookie("token", token, {
            path: "/", 
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            httpOnly: true,
            secure: true
        });

        newUser["token"] = token;
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**log in */
export const login = async (req, res) => {
    try {
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

        if (isMatch && user) {
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
            res.cookie("token", token, {
                path: "/",
                sameSite: none,
                expires: new Date(Date.now() + 1000 * 86400),
                httpOnly: true,
                secure: true,
            });
            delete user.password;
            res.status(200).json({token, user});
            console.log(user);
        } else {
            res.status(400).json({msg: 'Invalid password'});
        }
    } catch (error) {
        res.status(500).json({error: error.message}, process.env.JWT_SECRET);
    }
};

/**log out */
export const logout = async (req, res) => {
    res.cookie("token", "", { 
        path: "/",
        expires: new Date(0),
        sameSite: none,
        httpOnly: true,
        secure: true,
    });
    res.status(200).json({msg: 'Logged out'});
}

/**get login status */
export const loginStatus = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        
    }
}