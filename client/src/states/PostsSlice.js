import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/posts';

const initialState = {
    posts: [],
    post: null,
    status: "idle",
    error: null,
};

/**create a post */
export const createPost = createAsyncThunk(
    "post/CREATE",
    async (newPost, thunkAPI) => {
        try {
            const response = await axios.post(url, newPost);
            return response.data;
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
);

/**get all posts */
export const getPosts = createAsyncThunk(
    "posts/FETCH_ALL",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**get a post by id */
export const getPost = createAsyncThunk(
    "posts/getPost",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(url, id);
            return response.data;
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                console.log(action.payload);
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(getPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                console.log(action.payload);
                state.posts(action.payload);
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(getPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
                console.log(action.payload);
                state.posts(action.payload);
            })
            .addCase(getPost.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    }
});

export const getPostsStatus = (state) => state.posts.status;

export default postsSlice.reducer;