import React from 'react';
import Navigation from "./Navbar/Navbar";

const Layout = ({children}) => {
    return (
        <>
            <Navigation />
                <div style={{minHeight: "80vh"}} className="--pad">
                    {children}
                </div>
        </>
        
    );
};

export default Layout;