import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from '../services/postsService';
import { toast } from 'react-toastify';

const initialState = {
    post: null,
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

/**creat a new post */
const createPost = createAsyncThunk(
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

const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        CALC_STORE_VALUE: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state) => {
            state.isLoading = true;
        }).addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
            state.posts.push(action.payload);
            toast.success("Post added successfully");
        }).addCase(createPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
    },
});

export const {CALC_STORE_VALUE} = postsSlice.actions;
export const selectIsLoading = (state) => state.posts.isLoading;
export default postsSlice.reducer;