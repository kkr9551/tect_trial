import React from 'react';
//import Slider from './slider/Slider';
import { QuizProvider } from './context/quiz';
import Quiz from './components/Quiz';

const Booklist = () => {
  /*const slides = [
    {"src": "img/slide1.jpg"},
    {"src": "img/slide2.jpg"},
    {"src": "img/slide3.jpg"},
    {"src": "img/slide4.jpg"},
];*/
    return(
        <>
          <div className="quizGameContainer">
            {/*<Slider slides={slides} />*/}
            <QuizProvider>
              <Quiz />
            </QuizProvider>
          </div>
        </>
    );
};

export default Booklist;