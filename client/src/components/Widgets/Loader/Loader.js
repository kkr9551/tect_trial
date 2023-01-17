import React from 'react'
import Spinner from "react-bootstrap/Spinner";
import ReactDOM from 'react-dom';
import "./Loader.css";

const Loader = () => {
    return ReactDOM.createPortal(
        /**The first argument can be any renderable React child */
        <div className="wrapper">
            <div className='loader'>
                <Spinner animation='border' variant='primary' />
            </div>
        </div>,
        document.getElementById('loader') /**the second argument is a DOM element */
        //create a full screen loader
    )
}

export const SpinnerImg = () => {
    return(
        <div className="--center-all">
            <Spinner animation='border' variant='primary' />
        </div>
    )
} 

export default Loader;