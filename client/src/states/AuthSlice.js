import { createSlice } from "@reduxjs/toolkit";

//import posts from "./reducers/posts";
//import { sub } from "date-fns";
//import * as api from '../../../../api';

const name = JSON.parse(localStorage.getItem("userName"));

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    user: {
        userName: "",
        email: "",
        picturePath: "",
        cases: 0,
    },
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = action.payload;
            //state.user = action.payload.user;
            //state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        /*setWitnesses: (state, action) => {
            if (state.user) {
                state.user.witnesses = action.payload.witnesses;
            } else {
                console.error("Witnesses not found");
            }
        },*/
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
        setUser: (state, action) => {
            const profile = action.payload;
            state.user.userName = profile.userName;
            state.user.email = profile.email;
            state.user.picturePath = profile.picturePath;
            state.user.cases = profile.cases;
        },
        setName: (state, action) => {
            localStorage.setItem("userName", JSON.stringify(action.payload));
            state.name = action.payload
        },
    }
});

export const { setLogin, setLogout, setWitnesses, setPosts, setPost, setUser, setName } = authSlice.actions;
export default authSlice.reducer;