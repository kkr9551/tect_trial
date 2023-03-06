import React from 'react';
import "./Answer.css";

const Answer = ({answerText, onSelectAnswer, currentAnswer, correctAnswer}) => {
    const isCorrect = currentAnswer && answerText === correctAnswer;
    const isWrong = currentAnswer === answerText && currentAnswer !== correctAnswer;
    //neither const isWrong = currentAnswer && answerText !== correctAnswer
    //nor const isWrong = currentAnswer === currentAnswer && answerText !== correctAnswer
    const correctAnswerClass = isCorrect ? "correct-answer" : "";
    const wrongAnswerClass = isWrong ? "wrong-answer" : "";
    const disabledClass = currentAnswer ? "disabled-answer" : "";

    return (
        <div 
            className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`} 
            onClick={() => onSelectAnswer(answerText)}
        >
            <div className='answer-text'>{answerText}</div>
        </div>
    );
};

export default Answer;