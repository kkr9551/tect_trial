import React from 'react';
//import {RiSendPlaneFill} from 'react-icons/ri';
import {
    TiSocialFacebook, 
    TiSocialLinkedin, 
    TiSocialTwitter, 
    TiSocialInstagram, 
} from "react-icons/ti";
//import {Link} from 'react-router-dom';
//import {useMatch, useResolvePath} from "@tanstack/react-location";
import "./footer.css";
import Image from "../../../img/logo2.png";
import Discover from "./Discover";
import Help from "./Help";

/*function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvePath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return(
        <li className={isActive ? "active" : ""}>
            <Link href={to } {...props}>{children}</Link>
        </li>
    );
}*/

const Footer = () => {
    return(
        <div className="footer">
                <img src={Image} alt='logo' />

            <div className="social">
                <TiSocialFacebook />
                <TiSocialTwitter />
                <TiSocialInstagram />
                <TiSocialLinkedin />
            </div>
            <div className="discover">
                <Discover />
            </div>
            <div className="help">
                <Help />
            </div>
        </div>
    );
};

export default Footer;
