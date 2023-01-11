import React/*, {useEffect}*/ from 'react';
import Homepage from './components/pages/Homepage/Homepage';
import About from './components/pages/About';
import Booklist from './components/pages/Booklist/Booklist';
import Detection from './components/pages/Detection/Detection';
import Contact from './components/pages/Contact';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navigation from './components/Widgets/Navbar/Navbar';
//import Authentication from './components/pages/Authentication/Authentication';
import Profile from './components/pages/Profile/Profile'; 
import Login from "./components/pages/Login/Login";
import { useSelector } from 'react-redux';
import Sidebar from './components/pages/Profile/Sidebar/Sidebar';
//import {useDispatch} from "react-redux";
//import {getPosts} from "./actions/posts";


const App = () => {
    const isAuth = Boolean(useSelector((state) => state.token));
    return (
        <React.Fragment>
            <Router>
                <Navigation />
                <div className="main">
                    <Routes>
                        <Route path="/" element={<Homepage/>}></Route>
                        <Route path="/about" element={<About/>}></Route>
                        <Route path="/booklist" element={<Booklist/>}></Route>
                        <Route path="/detection" element={<Detection/>}></Route>
                        <Route path="/contact" element={<Contact/>}></Route>
                        <Route path="/profile" element={
                            isAuth ? <Profile/> : <Navigate to="/login"/>
                        }></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        
                        <Route 
                            path="/profile"
                            element={
                                <Sidebar>
                                    <Profile />
                                </Sidebar>
                                }>
                        </Route>
                    </Routes>
                </div> 
                
            </Router>
        </React.Fragment>
    );
};

export default App; 