import React, { useState, useEffect } from 'react';
import './Slider.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { SliderData } from './Slider-data';
import { Link } from 'react-router-dom';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = SliderData.length;
    //slideLength: 1 2 3 4
    //currentSlide: 0 1 2 3

    const autoScroll = false;
    let slideInterval;
    let intervalTime = 20000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    useEffect(() => {
        setCurrentSlide(0)
    }, []);
    
    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        if (!autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide])
    //


    return (
        <div classname="AboutUs-slider">
            <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
            {/**the class name can be a component. The unique styles for the class prev and the class arrow */}
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return(
                    <div 
                        className={index === currentSlide ? "AuSlide current" : "AuSlide"}
                        key={index}>
                            {index === currentSlide && (
                                <>
                                    <img src={slide.image} alt="slide" />
                                    <div className='slide-content'>
                                        <h2 className='sHeading'>{slide.heading}</h2>
                                        <p className='sDesc'>{slide.desc}</p>
                                        <hr />
                                        {index === 3 && (
                                            <Link className='contentBtn' to='/booklist'>Get Started</Link>
                                        )}
                                        
                                    </div>
                                </>
                            )}
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;