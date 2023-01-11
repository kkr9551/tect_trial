import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import "./SidebarItem.css";

const activeLink = ({isActive}) => (isActive ? "active" : "link");
const activeSublink = ({isActive}) => (isActive ? "active" : "link")

const SidebarItem = ({item, isOpen}) => {
    const [expandMenu, setExpandMenu] = useState(false);

    if (item.childrens) {
        return (
            <div className={
                expandMenu ? 
                "sidebar-item s-parent open" : "sidebar-item s-parent"
            }>
                <div className="sidebar-title">
                    <span>
                        {item.icon && (<div className="sidebar-icon">{item.icon}</div>)}
                        {isOpen && <div>{item.title}</div>}
                    </span>
                    <MdKeyboardArrowRight 
                        className='arrowIcon'
                        onClick={() => setExpandMenu(!expandMenu)}
                    />
                </div>
                <div className="sidebar-content">
                    {item.childrens.map((child, index) => {
                        return(
                            <div key={index} className="s-child">
                                <NavLink className={activeSublink} to={child.path}>
                                    <div className="sidebar-item">
                                        <div className="sidebar-title">
                                            <span>
                                                {child.icon && (
                                                    <div className="sidebar-icon">
                                                        {child.icon}
                                                    </div>
                                                )}
                                                {isOpen && (
                                                    <div>{child.title}</div>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return(
            <NavLink className={activeLink} to={item.path}>
                <div className='sidebar-item s-parent'>
                    <div className="sidebar-title">
                        <span>
                            {item.icon && (
                                <div className="sidebar-icon">
                                    {item.icon}
                                </div>
                            )}
                            {isOpen && (
                                <div>{item.title}</div>
                            )}
                        </span>
                    </div>
                </div>
            </NavLink>
        );
    }
    
};

export default SidebarItem;