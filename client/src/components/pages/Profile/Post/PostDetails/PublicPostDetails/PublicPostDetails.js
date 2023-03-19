import React, { useEffect, useState } from 'react';
import Loader from '../../../../../Widgets/Loader/Loader';
import { getPublicPost } from '../../../../../../states/PostsSlice';
import { useSelector, useDispatch } from 'react-redux';
import DOMPurify from "dompurify";
import { useParams } from 'react-router-dom';
import "./PublicPostDetails.css";
import { FaHandsHelping } from "react-icons/fa";
import { BsPinAngleFill } from "react-icons/bs";
//import ReactQuill from 'react-quill';
//import "react-quill/dist/quill.snow.css";
import { thankPost, nonthankPost } from '../../../../../../states/PostsSlice';
import { getLoginStatus, getUser } from '../../../../../../services/authServices';
//import UseRedirectLoggedOutUser from '../../../../../../custom hook/UseRedirectLoggedOutUser';
//import { selectUser } from '../../../../../../states/AuthSlice';

const PublicPostDetails = () => {
    const dispatch = useDispatch();
    const {post, isLoading, isError, message} = useSelector((state) => state.posts);
    const {id} = useParams();
    
    const [userId, setUserId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    console.log(userId);

    useEffect(() => {
        async function getUserStatus () {
            const status = await getLoginStatus()
            console.log(status);
            setLoggedIn(status);
        }
        getUserStatus();
    }, []);
    
    if (loggedIn === true) {
        async function getUserData () {
            const data = await getUser();
            console.log(data);
            setUserId(data ?._id);
        }
        getUserData();
    }
        /*useEffect(() => {
            async function getUserData () {
                const data = await getUser();
                console.log(data);
                setUserId(data ?._id);
            }
            getUserData();
        }, []);*/
    
    

    useEffect(() => {
        dispatch(getPublicPost(id));
        if (isError) {
            console.log(message);
        }
    }, [dispatch, isError, message])
    
    

    return (
        <div className="publicPostDetails">
            <h3 className='publicPDTitle'>Evidence Detail</h3>

            <div className="publicDetailsCard">
                {isLoading && <Loader />}
                {post && (
                    <div className="publicDetails">
                        <div className="PDcontainer">
                            {post?.image ? 
                                (<img src={post.image.filePath} alt={post.image.fileName} />) : 
                                (<p className='ppAlert'>No image set for this post</p>)
                            }
                        </div>
                        <hr/>
                        <h4 className='p-h4-ppdetails'>
                            <span className='public-badge'>Title: </span> &nbsp; {post.title}
                        </h4>
                        <p className='p-ppdetails'>
                            <b>&rarr; Tags: </b> {post.tags}
                        </p>
                        <hr/>

                        <div dangerouslySetInnerHTML={
                            {__html: DOMPurify.sanitize(post.content)}
                        } className="publicEvidenceContent">
                        </div>
                        <hr/>
                        <code className='--color-dark'>
                            Created on: {post.createdAt.toLocaleString("en-UK")}
                        </code>
                        <code className='--color-dark'>
                            Last Updated: {post.updatedAt.toLocaleString("en-UK")}
                        </code>
                        { loggedIn === true && (
                        <div className='actionBtnsGroup'>
                            
                            <button className='actionButton' 
                                        >
                                    <BsPinAngleFill size={20} color={"green"} id="pin" />
                                    <span>{post.marks ?.length > 0 && (<span>{post.marks ?.length}</span>)}</span>
                                </button>
                            
                            {
                                post.appreciations.includes(userId) ?
                                (
                                    <button className='actionButton' onClick={() => {dispatch(nonthankPost(post._id))}}>
                                        <FaHandsHelping size={20} color={"orange"} id="thank" />
                                    </button>
                                ) :
                                (
                                    <button className='actionButton' onClick={() => dispatch(thankPost(post._id))}>
                                        <FaHandsHelping size={20} color={"orange"} id="thank" />
                                    </button>
                                )
                            }
                        </div>
                        )}               
                    </div>
                )}
            </div>

            {/*<div className="tabs">
                <Tabs defaultActiveKey="1" tabPosition="left">
                    <Tabs.TabPane tab={<span><BsPinAngleFill />Marks</span>} key="1">
                        <Gamify tab="marks" />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span><FaHandsHelping />Appreciations</span>} key="2">
                        <Gamify tab="appreciations" />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span><BsPatchQuestionFill />Questions</span>} key="3">
                        <Gamify tab="questions" />
                    </Tabs.TabPane>
                </Tabs>        
                    </div>*/}

            {/*<div className="questionContainer">
                <h3>Your question: </h3>
                <ReactQuill 
                    
                />
                </div>*/}
        </div>
        
    );
};

export default PublicPostDetails;