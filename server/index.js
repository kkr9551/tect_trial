import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from './routes/posts.js';
import { protect } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import { errorHandler } from "./middleware/error.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use(errorHandler);

/**file storage */
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

/**route with files */
app.post('/auth/register', upload.single("picture"), register);
app.post("/posts", protect, upload.single("picture"), createPost);

/**routes */
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://kkr9551:TOiVuCte0ak28MtK@cluster0.ssxt6yk.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
//env. here stands for the environment. 
//In many environments you can set the env. variable PORT to tell your web server what port to listen on.

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
//the connect() function also accepts a callback function and return a promise.
//then we use app.listen() as the promise to bind and listen for connections on the specified host and path.
    .catch((error) => console.log(error.message));
//mongoose.connect(uri, {})

//mongoose.set('useFindAndModify', false);
/*useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are 
no longer supported options. Mongoose 6 always behaves as if 
useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, 
and useFindAndModify is false. Please remove these options from your code.*/