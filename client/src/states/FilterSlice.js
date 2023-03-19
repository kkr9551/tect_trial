import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredPosts: [],
    filteredQuestions: []
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterPosts: (state, action) => {
            const {posts, search} = action.payload;
            const tempPosts = posts.filter((post) => 
                post.title.toLowerCase().includes(search.toLowerCase()) /*|| 
                post.tags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()))*/
            );
            state.filteredPosts = tempPosts;
        },
        filterQuestions: (state, action) => {
            const {questions, search} = action.payload;
            const tempQuestions = questions.filter(
                (question) => question.bookname.toLowerCase().includes(search.toLowerCase())
            );
            state.filteredQuestions = tempQuestions;
        }
    },
});

export const {filterPosts} = filterSlice.actions;
export const {filterQuestions} = filterSlice.actions;
export const selectFilteredPosts = (state) => state.filter.filteredPosts;
export const selectFilteredQuestions = (state) => state.filter.filteredQuestions;
export default filterSlice.reducer;