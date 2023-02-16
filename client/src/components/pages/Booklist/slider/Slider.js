import React, { useState, useEffect } from 'react';
import "./slider.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";

const Slider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const auto = () => {
        slideInterval = setInterval(goToNext, intervalTime);
    };

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentIndex]);
    
    return(
        <>
            <div className='slider'>
                <div className="leftArrow" onClick={goToPrevious}>
                    <AiOutlineLeft />
                </div>
                <div className="rightArrow" onClick={goToNext}>
                    <AiOutlineRight />
                </div>
                <div 
                    className="slide" 
                    style={{backgroundImage: `url(${slides[currentIndex].src})`}}
                >

                </div>
                <div className='dotsContainer'>
                    {slides.map((slide, slideIndex) => (
                        <div className="dots" key={slideIndex} onClick={() => goToSlide(slideIndex)}>
                            <RxDotFilled />
                        </div>)
                    )}
                </div>
            </div>

            
        </>
    
    );
}

export default Slider;