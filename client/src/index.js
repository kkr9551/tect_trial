import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
//import {configureStore, /*compose, applyMiddleware*/} from '@reduxjs/toolkit';
//import thunk from 'redux-thunk';
//import reducers from './reducers'; 
import App from './App';
import "./global.css";
//import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from "@reduxjs/toolkit";
/*import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";*/
import authReducer from "./states/AuthSlice";
import postsReducer from "./states/PostsSlice";
import questionReducer from "./states/QuestionsSlice";
import filterReducer from "./states/FilterSlice";
//import { PersistGate } from "redux-persist/integration/react";
//import storage from "redux-persist/lib/storage";

//const persistConfig = {key: "root", storage, version: 1};
//const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore(
    {
        reducer: {
            auth: authReducer, 
            posts: postsReducer, 
            filter: filterReducer,
            questions: questionReducer
        },
        /*middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, 
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            },
        }),*/
    }
);

//const store = configureStore({reducer: reducers});
//compose function to form a larger store with multiple store enhancers.
//the store is the centre to hold all application's global states.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<PersistGate loading={null} persistor={persistStore(store)}>*/}
                <App />
        </Provider>
    </React.StrictMode>
);