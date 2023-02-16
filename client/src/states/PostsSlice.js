import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from '../services/postsService';
import { toast } from 'react-toastify';

const initialState = {
    //post: null,
    post: {
        title: '',
        tags: [],
        image: {},
        visibility: "private",
        content: '',
        marks: 0,
        questions: 0,
        appreciations: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

/**creat a new post */
export const createPost = createAsyncThunk(
    "posts/create",
    async (formData, thunkAPI) => {
        try {
            return await postsService.createPost(formData);
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**get all posts */
export const getAllPosts = createAsyncThunk(
    "posts/getAll", /**action type is composed of two parts: the domain and the event name */
    async (_, thunkAPI) => {
        try {
            return await postsService.getAllPosts();
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllPublicPosts = createAsyncThunk(
    "posts/getAllPublic",
    async (visibility, thunkAPI) => {
        try {
            return await postsService.getAllPublicPosts();
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**get a post's visibility status */
export const getVisibilityStatus = createAsyncThunk(
    "posts/getPublicStatus",
    async (id, thunkAPI) => {
        try {
            return await postsService.getVisibilityStatus(id);
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**delete a post */
export const deletePost = createAsyncThunk(
    "posts/delete", 
    async (id, thunkAPI) => {
        try {
            return await postsService.deletePost(id);
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//get a post
export const getPost = createAsyncThunk(
    "posts/getPost", 
    async (id, thunkAPI) => {
        try {
            return await postsService.getPost(id);
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**get single public post */
export const getPublicPost = createAsyncThunk(
    "posts/getPublicPost",
    async (id, thunkAPI) => {
        try {
            return await postsService.getPublicPost(id);
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**update a post */
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({id, formData}, thunkAPI) => {
        try {
            return await postsService.updatePost(id, formData);
        } catch (error) {
            const message = 
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**define a reducer function with createSlice
 * when the reducer operates, we don't have any state, that's why we need to define the initial state first
 */
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        CALC_STORE_VALUE: (state, action) => {

        },
        DETERM_PUBLIC_STATUS: (state, action) => {
            state.post.visibility = action.payload;
            //const post = action.payload;
            /*state.post.visibility = post.visibility;
            if (state.post.visibility === "public") {
                state.postIsPublic = true;
            } else {
                state.postIsPublic = false;
            }*/
            
            /*state.postIsPublic = action.payload
            const publicStatus = visibility;
            let statusValue;
            if (publicStatus === "public") {
                statusValue = true;
            }
            if (publicStatus === "private") {
                statusValue = false;
            }
            state.postIsPublic = statusValue;*/
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createPost.pending, (state) => {
            state.isLoading = true;
        }).addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.posts.push(action.payload);
            toast.success("Post added successfully");
        }).addCase(createPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        }).addCase(getAllPosts.pending, (state) => {
            state.isLoading = false;
        }).addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.posts = action.payload;
        }).addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        }).addCase(deletePost.pending, (state) => {
            state.isLoading = true;
        }).addCase(deletePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Evidence deleted successfully");
        }).addCase(deletePost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        }).addCase(getPost.pending, (state) => {
            state.isLoading = true;
        }).addCase(getPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.post = action.payload;
        }).addCase(getPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        }).addCase(updatePost.pending, (state) => {
            state.isLoading = true;
        }).addCase(updatePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Evidence updated successfully");
        }).addCase(updatePost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        }).addCase(getAllPublicPosts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllPublicPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.posts = action.payload;
        }).addCase(getAllPublicPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        }).addCase(getPublicPost.pending, (state) => {
            state.isLoading = true;
        }).addCase(getPublicPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.post = action.payload;
        }).addCase(getPublicPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
    },
});

export const {CALC_STORE_VALUE, DETERM_PUBLIC_STATUS} = postsSlice.actions;

export const selectIsLoading = (state) => state.posts.isLoading;
export const selectPost = (state) => state.posts.post;
export const selectPostIsPublic = (state) => state.posts.postIsPublic;
export const selectPostVisibility = (state) => state.posts.post.visibility;

export default postsSlice.reducer;
