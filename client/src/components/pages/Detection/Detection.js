import React, {useEffect} from 'react'; 
import './Detection.css';
import PostList from './Post/PostList/PostList';
//import { createPost, getPostsStatus } from '../../../states/PostsSlice';
import { useDispatch, useSelector } from "react-redux";
import { getAllPublicPosts } from '../../../states/PostsSlice';
//import { FaHandsHelping } from "react-icons/fa";
//import { BsPinAngleFill, BsPatchQuestionFill } from "react-icons/bs";
//import { AiOutlineEye } from "react-icons/ai";
//import { SpinnerImg } from '../../Widgets/Loader/Loader';

const Detection = () => { 
  const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getAllPublicPosts());
        if (isError) {
          console.log(message);
        }
    }, [dispatch]);
  const {posts, isLoading, isError, message} = useSelector((state) => state.posts);

  return(
    <div>
      <h1 className='detection-title'>Public Evidence</h1>
      <PostList posts={posts} isLoading={isLoading} />
    </div>
      
    )
};

export default Detection;