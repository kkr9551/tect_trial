import React from 'react';
import Cardgame from './matching game/matching_game';
import "./Homepage.css";
//import Slider from "./slider/Slider";
//import Footer from '../../commonUI/footer/footer';

const Homepage = () => {
  /*const slides = [
    {"src": "img/slide1.jpg"},
    {"src": "img/slide2.jpg"},
    {"src": "img/slide3.jpg"},
    {"src": "img/slide4.jpg"},
];*/

  return(
    <>
        {/*<div className="container-slider">
          <Slider slides={slides} />
        </div>*/}
        <div className="container-game">
          <p className="introduction">Censorship manipulations during the occupation of the USSR</p>
          <br/>
          <p className="introduction">still remains in present published translations.</p>
          
          <Cardgame />
        </div>
        <div className="push"></div>
    </>
  );
  
};

export default Homepage;