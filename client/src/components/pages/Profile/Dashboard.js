import React, { useEffect } from 'react';
import UseRedirectLoggedOutUser from '../../../custom hook/UseRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../states/AuthSlice';
import PostList from './Post/PostList/PostList';
import { getAllPosts } from '../../../states/PostsSlice';
import PostSummary from './Post/PostSummary/PostSummary';

const Dashboard = () => {
  UseRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //destructure all the redux states from the post
  const {posts, isLoading, isError, message} = useSelector((state) => state.posts);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllPosts());
    }
    if (isError) {
      console.log(message);
    }

  }, [isLoggedIn, isError, message, dispatch]);
  
  return (
    <div>
      <h2>Dashboard</h2>
      <PostSummary posts={posts} />
      <PostList posts={posts} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;