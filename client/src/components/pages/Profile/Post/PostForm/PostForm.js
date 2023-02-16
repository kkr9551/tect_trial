import React from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
//import Card from "../../../Widgets/Card";
import "./PostForm.css";

const Input = ({id, type, label, value, onChange, required, name}) => {
    return (
        <>
            <div className='input-group-evi'>
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

const PostForm = ({
    post, 
    postImage, 
    imagePreview, 
    content, 
    setContent, 
    visibility, 
    handleSelectChange,
    handleInputChange,
    handleImageChange,
    savePost
}) => {
    return (
        <div className='addPostContainer'>
            <h3 className='addEviTitle'>Add new evidence</h3>
            <form onSubmit={savePost}>
                <div className='addEvibox'>
                    <Input 
                        name="image"
                        type="file"
                        label="Evidence image (supported: jpg, jpeg, png)"
                        id="image"
                        onChange={(e) => handleImageChange(e)}
                    />
                    {imagePreview !== null ? 
                        (<div className='imagePreview'>
                            <img src={imagePreview} alt="post" />
                        </div>) : 
                        (<p className='noImage'>No image set for this post</p>)}
                    <Input 
                        type="text"
                        name="title"
                        label="Title"
                        id="title"
                        value={post?.title}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <Input 
                        type="text"
                        name="tags"
                        label="Tags (comma separated)"
                        id="tags"
                        value={post?.tags}
                        onChange={(e) => handleInputChange(e)}
                    />

                    <div className='selectVisibility'>
                        <label className='selectVLable'>Determine the visibility of your evidence:</label>
                        <select name='visibility' id='selectV' value={visibility} onChange={(e) => handleSelectChange(e)}>
                            <option value="">
                                --Please choose an option--
                            </option>
                            <option value="private">private</option>
                            <option value="public">public</option>
                        </select>
                    </div>
                    
                    <div className='content-box'>
                        <label className='content-label'>Content: </label>
                        <ReactQuill 
                            theme='snow' 
                            value={content} 
                            onChange={setContent}
                            modules={PostForm.modules}
                            formats={PostForm.formats}
                        />
                    </div>

                    <div className='eviSubmBtns'>
                            <button
                                type="submit"
                                className='submitBtnEvi'
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

PostForm.modules = {
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

PostForm.formats = [
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

export default PostForm;