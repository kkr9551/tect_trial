import React, { useState/*, useEffect, useRef*/ } from "react";
import { Link, Navigate, useMatch, useResolvedPath } from "react-router-dom";
import "./Navbar.css";
//import {MdNotifications} from 'react-icons/md';
//import { BsFillPersonFill/*, BsGlobe*/ } from 'react-icons/bs';
//import {Notification} from "./Notifi";
import Image from "../../../img/logo2.png";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setLogin } from "../../../states/AuthSlice";
import { RiUser4Line, RiLogoutCircleRLine } from "react-icons/ri";

function CustomLink({/*href*/to, children, ...props}) {
    //const path = window.location.pathname;
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return(
        <li className={isActive ? "active" : ""}>
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
    const isAuth = Boolean(useSelector((state) => state.token));

    /*let mpRef = useRef();
    useEffect(() => {
        let handlerP = (e) => {
            if (!mpRef.current.contains(e.target)) {
                setOpenAccount(false);
                console.log(mpRef.current);
            }
        };
        document.addEventListener("mousedown", handlerP);
        return() => {
            document.removeEventListener("mousedown", handlerP);
        }
    }, []);*/

    const logout = async () => {
        setLogout();
        dispatch(setLogin(false));
        Navigate("/");
    }
    
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
                    <CustomLink to="/profile">
                        <RiUser4Line className="item1" />
                    </CustomLink>
                    <Link onClick={isAuth && (logout)}>
                        <RiLogoutCircleRLine className="item2" />
                    </Link>
                </ul>
            </div>

            
            {/*<div className="nav_dropdown" ref={mpRef}>
                <div className="dropdown-trigger" onClick={
                    () => setOpenAccount(!openAccount)
                }>
                    <BsFillPersonFill className="icon" />
                </div>
                <div className={`dropdown-menu ${openAccount ? 'active' : 'inactive'}`}>
                    <ul>
                        <CustomLink className="item1" to="/profile/:userId">My profile</CustomLink>
                        <CustomLink 
                            className="item2"
                            onClick={
                                isAuth && 
                                (logout)}
                            >
                                Log out
                        </CustomLink>
                    </ul>                    
                </div>
            </div> */}
        </nav>

        </div>
    );
}; 

