import React from 'react';
import Footer from "./footer/footer";

const Layout = ({children}) => {
    return (
        <>
            <div>
                {children}
            </div>
            <Footer />
        </>
        
    );
};

export default Layout;