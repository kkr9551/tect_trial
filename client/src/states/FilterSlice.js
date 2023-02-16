import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredPosts: []
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
    },
});

export const {filterPosts} = filterSlice.actions;
export const selectFilteredPosts = (state) => state.filter.filteredPosts;
export default filterSlice.reducer;