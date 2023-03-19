import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionsService from "../services/questionsService";
import { toast } from 'react-toastify';

const initialState = {
    question: {
        bookname: "",
        content: "",
        marks: [],
        image: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    questions: [],
    isErrorQues: false,
    isSuccessQues: false,
    isLoadingQues: false,
    messageForQues: "",
};

/**create a new question */
export const createQuestion = createAsyncThunk(
    "questions/create",
    async (formData, thunkAPI) => {
        try {
            return await questionsService.createQuestion(formData);
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

/**get all questions */
export const getAllQuestions = createAsyncThunk(
    "questions/getAll",
    async (_, thunkAPI) => {
        try {
            return await questionsService.getAllQuestions(); 
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

/**get a question */
export const getQuestion = createAsyncThunk(
    "questions/getQuestion",
    async (id, thunkAPI) => {
        try {
            return await questionsService.getQuestion(id);
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

/** delete a question */
export const deleteQuestion = createAsyncThunk(
    "questions/deleteQuestion",
    async (id, thunkAPI) => {
        try {
            return await questionsService.deleteQuestion(id);
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

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(createQuestion.pending, (state) => {
            state.isLoadingQues = true;
        }).addCase(createQuestion.fulfilled, (state, action) => {
            state.isLoadingQues = false;
            state.isSuccessQues = true;
            state.isErrorQues = false;
            console.log(action.payload);
            state.questions.push(action.payload);
            toast.success("Question added successfully");
        }).addCase(createQuestion.rejected, (state, action) => {
            state.isLoadingQues = false;
            state.isErrorQues = true;
            state.messageForQues = action.payload;
            toast.error(action.payload);
        }).addCase(getAllQuestions.pending, (state) => {
            state.isLoadingQues = true;
        }).addCase(getAllQuestions.fulfilled, (state, action) => {
            state.isLoadingQues = false;
            state.isSuccessQues = true;
            state.isErrorQues = false;
            console.log(action.payload);
            state.questions = action.payload;
        }).addCase(getAllQuestions.rejected, (state, action) => {
            state.isLoadingQues = false;
            state.isErrorQues = true;
            state.messageForQues = action.payload;
            toast.error(action.payload);
        }).addCase(getQuestion.pending, (state) => {
            state.isLoadingQues = true;
        }).addCase(getQuestion.fulfilled, (state, action) => {
            state.isLoadingQues = false;
            state.isSuccessQues = true;
            state.isErrorQues = false;
            state.question = action.payload;
        }).addCase(getQuestion.rejected, (state, action) => {
            state.isLoadingQues = false;
            state.isErrorQues = true;
            state.messageForQues = action.payload;
            toast.error(action.payload);
        }).addCase(deleteQuestion.pending, (state) => {
            state.isLoadingQues = true;
        }).addCase(deleteQuestion.fulfilled, (state, action) => {
            state.isLoadingQues = false;
            state.isSuccessQues = true;
            state.isErrorQues = false;
            toast.success("Question deleted successfully");
        }).addCase(deleteQuestion.rejected, (state, action) => {
            state.isLoadingQues = false;
            state.isErrorQues = true;
            state.messageForQues = action.payload;
            toast.error(action.payload);
        })
    }
});

export const selectIsLoading = (state) => state.questions.isLoadingQues;
export default questionsSlice.reducer;