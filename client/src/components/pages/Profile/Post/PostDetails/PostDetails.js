import React, { useEffect } from 'react';
import "./PostDetails.css";
import UseRedirectLoggedOutUser from "../../../../../custom hook/UseRedirectLoggedOutUser"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../../../states/AuthSlice';
import { getPost } from '../../../../../states/PostsSlice';
import Card from "../../../../Widgets/Card";
import { SpinnerImg } from '../../../../Widgets/Loader/Loader';
import DOMPurify from "dompurify";

//if the post is invisible to other users, the post detail should not contain the comment input field, the summary about how many appreciations and many marks the user has received
//it is necessary to create a new controller and route
//here is to get a private post
const PostDetails = () => {

    UseRedirectLoggedOutUser("/login");

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {post, isLoading, isError, message} = useSelector((state) => state.posts);
    const {id} = useParams();

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getPost(id));
            
        }
        if (isError) {
            console.log(message);
        }
    
    }, [isLoggedIn, isError, message, dispatch]);

    /*const availabilityStatus = () => {

    };*/

    return (
        <div className='postDetails'>
            <h3 className='PDtitle'>Evidence Detail</h3>
            <Card cardClass="detailCard">
                {isLoading && <SpinnerImg />}
                {post && (
                    <div className='details'>
                        <Card cardClass="group">
                            {post?.image ? 
                                (<img src={post.image.filePath} alt={post.image.fileName} />) : 
                                (<p className='nonPostAlert'>No image set for this post</p>)
                            }
                        </Card>
                        <hr/>
                        <h4 className="p-h4">
                            <span className='badge'>Title: </span> &nbsp; {post.title}
                        </h4>
                        <p className='p-details'>
                            <b>&rarr; Tags: </b> {post.tags}
                        </p>
                        <hr/>

                        <div dangerouslySetInnerHTML={
                            {__html: DOMPurify.sanitize(post.content)}
                        } className="evidenceContent">
                        </div>
                        <hr/>
                        <code className='--color-dark'>
                            Created on: {post.createdAt.toLocaleString("en-UK")}
                        </code>
                        <code className='--color-dark'>
                            Last Updated: {post.updatedAt.toLocaleString("en-UK")}
                        </code>
                    </div>
                )}
            </Card>
        </div>
        
    );
};

export default PostDetails;