import React from 'react';
import HeaderForD from './HeaderForD';

const LayoutForD = ({children}) => {
    return (
        <>
            <HeaderForD />
            <div style={{minHeight: "80vh"}} className="--pad">
                {children}
            </div>
        </>
    );
};

export default LayoutForD;