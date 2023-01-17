import React, { useState } from 'react';
import Image from "../../../../img/logo2.png";
import { RiMenuAddLine } from "react-icons/ri";
import Menu from "./Menu";
import SidebarItem from "./SidebarItem";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    };
    
    return (
        <div className='layout'>
            <div className='sidebar' style={{width: isOpen ? "230px" : "60px"}}>
                <div className='top_section'>
                    <div className='logo' style={{display: isOpen ? "block" : "none"}}>
                        <img 
                            src={Image} 
                            alt="logo" 
                            id="logo-insidebar"
                            onClick={goHome} 
                            style={{cursor: "pointer"}}
                            
                        />
                    </div>
                    
                    <div className="bars" style={{marginLeft: isOpen ? "80px" : "0px"}}>
                        <RiMenuAddLine onClick={toggle} /> 
                    </div>
                </div>
                {Menu.map((item, index) => {
                    return(
                        <SidebarItem key={index} item={item} isOpen={isOpen} />
                    );
                })}
            </div>
            <main style={{
                paddingLeft: isOpen ? "230px" : "60px", 
                transition: 'all 0.5s'
            }}>
                {children}
            </main>
        </div>
    );
};

export default Sidebar;