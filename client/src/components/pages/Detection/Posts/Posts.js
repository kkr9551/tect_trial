import React, { useEffect, useRef } from 'react';
//import Post from './Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
//import "./Posts.css";
import { selectAllPosts, getPostsStatus, getPostsError, getPosts } from '../../../../states/AuthSlice';
import PostsExcerpt from './PostsExcerpt';
//import { nanoid } from '@reduxjs/toolkit';
//import { FiThumbsUp, FiBookmark } from "react-icons/fi";
import "./Posts.css";
import TimeAgo from './timeAgo';
import "./PostsExcerpt.css";


const Posts = () => {
    const dispatch = useDispatch();

    const posts = useSelector(/*(state) => state.posts*/selectAllPosts);
    console.log(posts);

    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    const shouldLog = useRef(true);

    useEffect(() => {
        
        if (shouldLog.current) {
            shouldLog.current = false;
            if (postStatus === 'idle') {
                dispatch(getPosts());
            }
        }
        /*if (postStatus === 'idle') {
            dispatch(getPosts());
        }*/
    }, [postStatus, dispatch]);

    //const orderedPosts = posts.slice().sort((a, b) => b.date.localCompare(a.date));

    /*const renderedPost = orderedPosts.map((post) => (
        
    ));*/

    let content;
    if (postStatus === "loading") {
        content = <Spinner animation="border" />;
    } else if (postStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        content = orderedPosts.map(post => 
            <PostsExcerpt key={post._id} post={post} />
            );
    } else if (postStatus === "failed") {
        content = <p>{error}</p>
    }
    
    return(
        <>
            <Container fluid>
                <Row>
                    <Col className='title'>
                        <h1>Notice Board</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className='notice'>
                        <div>
                            {content}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Posts;