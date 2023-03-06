import React, { useContext } from 'react';
import { QuizContext } from '../context/quiz';
import "./Quiz.css";
import Question from "./Question.js";
import Slider from "../slider/Slider.js";

const Quiz = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const slides = [
        {"src": "img/slide1.jpg"},
        {"src": "img/slide2.jpg"},
        {"src": "img/slide3.jpg"},
        {"src": "img/slide4.jpg"},
    ];
    console.log('quizState', quizState);
    return (
        <div className='quizGame'>
            {quizState.showResults && (
                <div className='results'>
                    {quizState.correctAnswerCount <= 3 ? (
                        <div className='result-container'>
                            <div className='result-info'>
                                You've got {quizState.correctAnswerCount} of {""} {quizState.questions.length} right.
                            </div>
                            <div className='congratulation'>We suspect your loyalty to the Party. Glavlit decided to kick you out.</div>
                            <div className='next-btn' onClick={() => dispatch({type: "RESTART"})}>Restart</div>
                            
                        </div>
                    ) : quizState.correctAnswerCount >= 4 || quizState.correctAnswerCount <= 6 ? (
                        <div className='result-container'>
                            <div className='result-info'>
                                You've got {quizState.correctAnswerCount} of {""} {quizState.questions.length} right.
                            </div>
                            <div className='congratulation'>You have to receive more training until you get sharp eyes to purge corrupt thoughts</div>
                            <div className='next-btn' onClick={() => dispatch({type: "RESTART"})}>Restart</div>
                            
                        </div>
                    ) : (
                        <div className='result-container'>
                            <div className='result-info'>
                                Well done! You've got {quizState.correctAnswerCount} of {""} {quizState.questions.length} right.
                            </div>
                            <div className='congratulation'>Glavlit appreciate your capacity! You're our native land's hope!</div>
                            <div className='next-btn' onClick={() => dispatch({type: "RESTART"})}>Restart</div>
                            
                        </div>
                    )}
                    <div className='container-slider'>    
                        <Slider slides={slides} />
                    </div>
                </div>
            )}
            {!quizState.showResults && (
                <div>
                    <div className='book-score'>
                        Book {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
                    </div>
                    <Question />
                    <div className='next-btn' onClick={() => dispatch({type: 'NEXT_QUESTION'})}>Next Question</div>
                </div>
            )}
        </div>
    );
};

export default Quiz;