import React, { useState, useEffect } from 'react';
import "./Form.css";
import Input from "./Input";
//import { useDispatch } from "react-redux";
//import { selectAllUsers } from '../../../../usersSlice';
//import { nanoid } from "@reduxjs/toolkit";
//import { createPost } from '../../../../actions/posts';
//import { /*postAdded*/createPost } from "../../../../states/AuthSlice";
//import SelectedFormA from './SelectedFormA';
//import SelectedFormB from './SelectedFormB';
import ReactQuill from "react-quill";

/**two different forms according to the choice of reading source text or translation */

const Form = () => {
    const [form, setForm] = useState("selectTheTextType");
    const [formA, setFormA] = useState(false);
    const [formB, setFormB] = useState(false);

    useEffect(() => { 
            form === "Ask for help" ? setFormA(true) : setFormA(false);
            form === "To be a witness" ? setFormB(true) : setFormB(false);
    }, [form]);

    const renderForm = () => {
        let selectForm;
        form === "selectTheTextType" ? 
            (selectForm = "Select the text type") : (selectForm = makeChoice(form));
        return selectForm;
    };

    const makeChoice = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const [postData, setPostData] = useState(
        {
            title: '', 
            tags: '',
            content: '', 
        });
    
    //const [title, setTitle] = useState("");
    //const [tags, setTags] = useState("");
    //const [inputFile, setInputFile] = useState("");
    //const [content, setContent] = useState("");
    
    
    //const handleTitleChange = (e) => setTitle(e.target.value);
    //const handleTagsChange = (e) => setTags(e.target.value);
    //const handleContentChange = (e) => setContent(e.target.value);
    

    /*const handleInputFileChange = async (e) => {
        const file = e.target.files[0];
        setInputFile(await convertBase64(file));
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };*/

    //const [userId, setUserId] = useState("");
    //const users = useSelector(selectAllUsers);

    //const [addRequestStatus, setAddRequestStatus] = useState('idle');

    //const dispatch = useDispatch();

    //const canSubmit = Boolean(postData) && addRequestStatus === "idle";

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        if (canSubmit) {
            try {
                setAddRequestStatus("pending")
                await dispatch(createPost({postData})).unwrap();
                setPostData({
                    title: '', 
                    tags: '',
                    content: '',
                });
            } catch (error) {
                console.log("Failed to save the post");;
            } finally {
                setAddRequestStatus("idle");
            }
        }
        e.preventDefault();
        if (title && tags && inputFile && content) {
            dispatch(
                postAdded(title, tags, inputFile, content, userId)
            )
            setTitle('');
            setTags('');
            setInputFile('');
            setContent('');
        }
    }

    const clear = () => {
    };*/

    return(
        <>
            <div className="F">
                <div className="formTitle">
                    <h1>Post a notice</h1>
                    <h2>{renderForm()}</h2>
                    <select 
                        className='formSelect' 
                        value={form} 
                        onChange={(e) => setForm(e.target.value)}>
                            <option value="selectTheTextType">What are you going to do?</option>
                            <option value="Ask for help">Put up a notice</option>
                            <option value="To be a witness">Provide evidence</option>
                    </select>
                </div>
                <div className='postForm'>
                    {formA && (
                        <form  action=''>
                            <Input 
                                id="title"
                                value={postData.title}
                                required 
                                label="Book name, source text" 
                                type="text" 
                                placeholder="Enter book name and author name"
                                //value={postData.bookname1}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    title: e.target.value
                                })} />
                            <Input
                                id="tags" 
                                value={postData.tags}
                                label='Tags (coma separated)'
                                type="text" 
                                placeholder="Enter tags"
                                //value={postData.tags}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    tags: e.target.value.split(',')
                                })} />
                            <label className='textarea-label'>Enter the ins and outs of your case</label>
                            <textarea 
                                id="content"
                                value={postData.content}
                                required  
                                name="content"
                                rows={5}
                                cols={45}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    content: e.target.value
                                })}></textarea>
                            <button className='submit-btn' /*onClick={handleSubmit} disabled={!canSubmit}*/>Submit</button>
                            <button className='clear-btn' /*onClick={clear}*/>Clear</button>
                        </form>
                    )}
                    {formB && (
                        <form action=''>
                            <Input 
                                id="title"
                                value={postData.title}
                                required 
                                label="Book name, source text" 
                                type="text" 
                                placeholder="Enter translation name and author name"
                                //value={postData.bookname1}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    title: e.target.value
                                })} />
                            <Input
                                id="tags" 
                                value={postData.tags}
                                label='Tags (coma separated)'
                                type="text" 
                                placeholder="Enter tags"
                                //value={postData.tags}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    tags: e.target.value.split(',')
                                })} />
                            <label className='textarea-label'>Enter the ins and outs of your case</label>
                            <textarea 
                                id="content"
                                value={postData.content}
                                required  
                                name="content"
                                rows={5}
                                cols={45}
                                onChange={(e) => setPostData({
                                    ...postData,
                                    content: e.target.value
                                })}></textarea>
                            <button className='submit-btn' /*onClick={handleSubmit} disabled={!canSubmit}*/>Submit</button>
                            <button className='clear-btn' /*onClick={clear}*/>Clear</button>
                        </form>
                    )}
                </div>
            </div>           
        </>
    );
}

export default Form;