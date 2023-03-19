import { createSlice } from "@reduxjs/toolkit";

//import posts from "./reducers/posts";
//import { sub } from "date-fns";
//import * as api from '../../../../api';

const name = JSON.parse(localStorage.getItem("name"));


const initialState = {
    isLoggedIn: false,
    name: name ? name : "", //the name of state will be saved in the local storage
    user: {
        _id: "",
        name: "",
        email: "",
        picturePath: "",
        cases: 0,
        selfIntro: "I am ..."
    },
    
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //inside this reducers function, we created actions 
        setLogin: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUser: (state, action) => {
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.picturePath = profile.picturePath;
            state.user.cases = profile.cases;
            state.user.selfIntro = profile.selfIntro;
        },
        //setting the name of user is for avoiding repeating the operation on the display of the user name
        //we could store that user name in the local storage
        setName: (state, action) => {
            localStorage.setItem("name", JSON.stringify(action.payload));
            state.name = action.payload
        },
        
    }
});

export const { setLogin, setUser, setName } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectName = (state) => state.auth.name;

export default authSlice.reducer;