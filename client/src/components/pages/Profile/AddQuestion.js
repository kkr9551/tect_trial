import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { createQuestion, selectIsLoading } from '../../../states/QuestionsSlice';
import QuestionForm from './Question/QuestionForm/QuestionForm';
import Loader from '../../Widgets/Loader/Loader';
//import QuestionList from './Question/QuestionList/QuestionList';
//import QuestionSummary from './Question/QuestionSummary/QuestionSummary';

const initialState = {
    bookname: "",
};

const AddQuestion = () => {
    const dispatch = useDispatch();
    //const navigate = useDispatch();

    const [question, setQuestion] = useState(initialState);
    const [questionImage, setQuestionImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [content, setContent] = useState("");
    const isLoading = useSelector(selectIsLoading);

    const {bookname} = question;

    //const {questions, isError, message} = useSelector((state) => state.questions);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setQuestion({...question, [name]: value});
    };

    const handleImageChange = (e) => {
        setQuestionImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const saveQuestion = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("bookname", bookname);
        formData.append("content", content);
        formData.append("image", questionImage);

        console.log(...formData);

        await dispatch(createQuestion(formData));

        //navigate('/dashboard');
    }

    

    return (
        <div>
            {isLoading && <Loader />}
            
            <QuestionForm 
                question={question}
                questionImage={questionImage}
                imagePreview={imagePreview}
                content={content}
                setContent={setContent}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveQuestion={saveQuestion} 
            />
            
        </div>
    );
};

export default AddQuestion;