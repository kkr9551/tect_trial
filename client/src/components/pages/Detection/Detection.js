import React, {useEffect} from 'react'; 
import './Detection.css';
import PostList from './Post/PostList/PostList';
//import { createPost, getPostsStatus } from '../../../states/PostsSlice';
import { useDispatch, useSelector } from "react-redux";
import { getAllPublicPosts } from '../../../states/PostsSlice';
//import QuestionList from './Question/QuestionList/QuestionList';

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
    <div className='detectionContainer'>
      <h1 className='detection-title'>Public Evidence</h1>
      <p className='detection-desc'>
        Congratulations! We are glad that you decided to become a detective.
        <br/>
        Excited but perhaps a bit confused. You may ask yourself "What should I do?"
        <br/>
        Of course, gathering evidence when you're comparing the original with translated text.  
      </p>
      <img className='insertedImageD' src="img/detective-illus.jpg" alt="detective" />
      <p className='detection-desc'>
        In your profile, click the option "Add Evidence" on the right-side menu.
        <br/>
        As shown in the example below, you post evidence through filling in a form.
        <br/>
        We recommend that you input the book's name in the "Title" input
        <br/>
        You also need to add tags to generalise the feature of your evidence. For instance, ideology.
        <br/>
        If you are not confident the reliability of your evidence, just select "private" as the visibility.
        <br/>
      </p>

      

      <img className='examplePic' src="img/exampleDetect.png" alt='example' />
      <p className='detection-desc'>
        Even though you're a normal reader without any background of literature research or cultural studies,
        <br/> 
        what we expect to see is the editted or cut text you discover in comparing different text types. 
      </p>

      <hr id='hr-detection' />

      <PostList posts={posts} isLoading={isLoading} />
    </div>
      
    )
};

export default Detection;