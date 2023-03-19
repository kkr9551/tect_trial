import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../../states/QuestionsSlice';
import QuestionList from './Question/QuestionList/QuestionList';
import QuestionSummary from './Question/QuestionSummary/QuestionSummary';

const MyQuestion = () => {
    const dispatch = useDispatch();

    //destructure all the redux states from the post
    const {questions, isLoadingQues, isErrorQues, messageForQues} = useSelector((state) => state.questions);
    
    //get all questions in a list
    useEffect(() => {
        dispatch(getAllQuestions());
        if (isErrorQues) {
            console.log(messageForQues);
        }
    }, [dispatch, isErrorQues, messageForQues]);

    return (
        <div className='addQuestionPage'>
            <QuestionSummary questions={questions} />
            <QuestionList questions={questions} isLoading={isLoadingQues} />
        </div>
    )
}

export default MyQuestion