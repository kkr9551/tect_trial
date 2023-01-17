import React, { useState/*, useEffect, useRef*/ } from "react";
import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";
//import {MdNotifications} from 'react-icons/md';
//import { BsFillPersonFill/*, BsGlobe*/ } from 'react-icons/bs';
//import {Notification} from "./Notifi";
import Image from "../../../img/logo2.png";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../states/AuthSlice";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { logoutUser } from "../../../services/authServices";

function CustomLink({/*href*/to, children, ...props}) {
    //const path = window.location.pathname;
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return(
        <li className={isActive ? "activeli" : ""}>
            <Link to={/*href*/to} {...props}>
                {children}
            </Link>
        </li>
    );
};

export default function Navigation() {
    const [fix, setFix] = useState(false);

    const setFixed = () => {
        if(window.scrollY >= 592) {
            setFix(true);
        } else {
            setFix(false);
        }
    };

    window.addEventListener("scroll", setFixed);

    //const [openAccount, setOpenAccount] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await logoutUser();
        dispatch(setLogin(false));
        navigate("/");
    };
    
    return(
        <div>
        
        <nav className={fix ? 'nav fixed' : 'nav'}>
            <div className="logo">
                <Link /*href*/to="/">
                    <img src={Image} alt="logo" id="logo" />
                </Link>
            </div>

            <div className="nav_menu">
                <ul className="menu-link">
                    <CustomLink /*href*/to="/about">About</CustomLink>
                    <CustomLink /*href*/to="/booklist">Booklist</CustomLink>
                    <CustomLink /*href*/to="/detection">Detection</CustomLink>
                    <CustomLink /*href*/to="/contact">Contact</CustomLink>
                </ul>
            </div>

            <div className="user_menu">
                <ul className="menu-link2">
                    <CustomLink to="/dashboard">
                        <HiOutlineUser className="item1" />
                    </CustomLink>
                    <Link onClick={logout}>
                        <HiOutlineLogout className="item2" />
                    </Link>
                </ul>
            </div>
        </nav>

        </div>
    );
}; 

