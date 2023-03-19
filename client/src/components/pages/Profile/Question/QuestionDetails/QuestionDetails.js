import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UseRedirectLoggedOutUser from '../../../../../custom hook/UseRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../../../../states/AuthSlice';
import { getQuestion } from '../../../../../states/QuestionsSlice';
import Card from '../../../../Widgets/Card';
import { SpinnerImg } from '../../../../Widgets/Loader/Loader';
import DOMPurify from "dompurify";
import "./QuestionDetails.css";

const QuestionDetails = () => {
    UseRedirectLoggedOutUser("/login");

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {question, isLoadingQues, isErrorQues, messageForQues} = useSelector((state) => state.questions);
    const {id} = useParams();

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getQuestion(id));
        }
        if (isErrorQues) {
            console.log(messageForQues);
        }
    })
    return (
        <div className='questionDetails'>
            <h3 className='PDtitle'>Question Detail</h3>
            <Card cardClass="detailCard">
                {isLoadingQues && <SpinnerImg />}
                {question && (
                    <div className='details'>
                        <Card cardClass="group">
                            {
                                question?.image ? 
                                    (<img src={question.image.filePath} alt={question.image.fileName} />) : 
                                    (<p className='nonPostAlert'>No image set for this question</p>)
                            }
                        </Card>
                        <hr/>
                        <h4 className="p-h4">
                            <span className='badge'>Book Name: </span> &nbsp; {question.bookname}
                        </h4>
                        <hr/>

                        <div dangerouslySetInnerHTML={
                            {__html: DOMPurify.sanitize(question.content)}
                        } className="evidenceContent">
                        </div>
                        <hr/>
                        <code className='--color-dark'>
                            Created on: {question.createdAt.toLocaleString("en-UK")}
                        </code>
                        <code className='--color-dark'>
                            Last Updated: {question.updatedAt.toLocaleString("en-UK")}
                        </code>
                    </div>
                )}
            </Card>
        </div>
    )
};

export default QuestionDetails;