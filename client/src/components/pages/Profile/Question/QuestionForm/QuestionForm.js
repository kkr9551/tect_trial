import React from 'react';
import "./QuestionForm.css";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

const Input = ({id, type, label, value, onChange, required, name}) => {
    return(
        <>
            <div className='input-group-ques'>
                <label htmlFor={id}>{label}</label>
                <input 
                        id={id} 
                        type={type} 
                        value={value} 
                        name={name} 
                        onChange={onChange}
                        required={required}
                    />
            </div>
        </>
    );
};

const QuestionForm = ({question, questionImage, imagePreview, content, setContent, 
    handleInputChange, handleImageChange, saveQuestion}) => {
    return (
        <div className='addQuestionContainer'>
            <h3 className='addQuesTitle'>Add new question</h3>
            <form onSubmit={saveQuestion}>
                <div className='addQuesBox'>
                    <Input 
                        name="image" 
                        type="file" 
                        label="Question image (supported: jpg, jpeg, png)" 
                        id="image" 
                        onChange={(e) => handleImageChange(e)}
                    />
                    {imagePreview !== null ? 
                        (<div className='imagePreview'>
                            <img src={imagePreview} alt="question" />
                        </div>) : 
                        (<p className='noImage'>No image set for this post</p>)}
                    <Input 
                        type="text"
                        name="bookname"
                        label="Book Name"
                        id="bookname"
                        value={question?.title}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <div className='content-box'>
                        <label className='content-label'>Content: </label>
                        <ReactQuill 
                            theme='snow' 
                            value={content} 
                            onChange={setContent}
                            modules={QuestionForm.modules}
                            formats={QuestionForm.formats}
                        />
                    </div>
                    <div className='quesSubmBtns'>
                            <button
                                type="submit"
                                className='submitBtnQues'
                                id='btn'
                            >
                                Submit
                            </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

QuestionForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["clean"],
    ],
};

QuestionForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
];

export default QuestionForm;