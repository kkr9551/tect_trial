import React, { useEffect } from 'react';
import Homepage from './components/pages/Homepage/Homepage';
import About from './components/pages/About/About';
import Booklist from './components/pages/Booklist/Booklist';
import Detection from './components/pages/Detection/Detection';
import Contact from './components/pages/Contact/Contact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Navigate } from 'react-router-dom';
//import Navigation from './components/Widgets/Navbar/Navbar';
//import Authentication from './components/pages/Authentication/Authentication';
//import Profile from './components/pages/Profile/Profile'; 
import MyProfile from './components/pages/Profile/MyProfile/MyProfile';
import Register from "./components/pages/Auth/Register/Register";
import Login from "./components/pages/Auth/Login/Login";
import Dashboard from "./components/pages/Profile/Dashboard";
import EditProfile from "./components/pages/Profile/EditProfile/EditProfile";
import AddPost from './components/pages/Profile/AddPost';
import AddQuestion from './components/pages/Profile/AddQuestion';
import { getLoginStatus } from './services/authServices';
import { setLogin } from './states/AuthSlice';
import Sidebar from './components/pages/Profile/Sidebar/Sidebar';
import LayoutForD from "./components/Widgets/LayoutForD";
import { useDispatch } from "react-redux";
//import {getPosts} from "./actions/posts";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Layout from './components/Widgets/Layout';
import PostDetails from './components/pages/Profile/Post/PostDetails/PostDetails';
import QuestionDetails from './components/pages/Profile/Question/QuestionDetails/QuestionDetails';
import PublicPostDetails from './components/pages/Profile/Post/PostDetails/PublicPostDetails/PublicPostDetails';
import EditPost from './components/pages/Profile/EditPost';
import MyQuestion from './components/pages/Profile/MyQuestion';
//import { selectIsLoggedIn } from './states/AuthSlice';

axios.defaults.withCredentials = true;
//this expression means that everytime we send the request and receive the response in registering a user, we are able to store the cookie in the browser.

const App = () => {
    //const isAuth = Boolean(useSelector(selectIsLoggedIn));
    const dispatch = useDispatch();

    useEffect(() => {
        async function loginStatus() {
            const status = await getLoginStatus();
            dispatch(setLogin(status));
            /**we set a const variable first and assign the status value to it as the value in this async function; 
             * we will detect if the user is already logged in
             * then we dispatch the action setLogin and pass in the status as the payload */
        }
        loginStatus();
    }, [dispatch]);

    return (
        <React.Fragment>
            <Router>
                <ToastContainer />
                <div className="main">
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <Layout>
                                    <Homepage/>
                                </Layout>}></Route>
                        <Route 
                            path="/about" 
                            element={
                                <Layout>
                                    <About/>
                                </Layout>}></Route>
                        <Route 
                            path="/booklist" 
                            element={
                                <Layout>
                                    <Booklist/>
                                </Layout>}></Route>
                        <Route 
                            path="/detection" 
                            element={
                                <Layout>
                                    <Detection/>
                                </Layout>}></Route>
                        <Route 
                            path="/contact" 
                            element={
                                <Layout>
                                    <Contact/>
                                </Layout>}></Route>
                        <Route 
                            path="/register" 
                            element={
                                <Layout>
                                    <Register/>
                                </Layout>}></Route>
                        <Route path="/login" element={
                            <Layout>
                                <Login/>
                            </Layout>}></Route>
                        <Route 
                            path="/public-post-details/:id"
                            element={
                                <Layout>
                                    <PublicPostDetails/>
                                </Layout>}></Route>

                        <Route
                            path='/dashboard' 
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <Dashboard />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route
                            path='/add-evidence' 
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <AddPost />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route 
                            path='/add-question'
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <AddQuestion />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route 
                            path='/my-question'
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <MyQuestion />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route
                            path='/post-details/:id' 
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <PostDetails />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route
                            path='/question-details/:id' 
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <QuestionDetails />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route
                            path='/edit-evidence/:id' 
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <EditPost />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route
                            path='/my-profile' 
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <MyProfile />
                                    </LayoutForD>
                                </Sidebar>
                            } />
                        <Route 
                            path="/edit-profile"
                            element={
                                <Sidebar>
                                    <LayoutForD>
                                        <EditProfile />
                                    </LayoutForD>
                                </Sidebar>
                            }/>
                    </Routes>
                </div> 
                
            </Router>
        </React.Fragment>
    );
};

export default App; 