import React from 'react';
//import PostAuthor from './postAuthor';
import TimeAgo from './timeAgo';
//import LikeBtn from './Post/LikeBtn';
import "./PostsExcerpt.css";

const PostsExcerpt = ({post}) => {
    return (
        <article className='article-post'>
            <h1>{post.title}</h1>
            <h2>{post.tags}</h2>
            
            <p>{post.content}</p>
            <h5>
                <TimeAgo timestamp={post.createdAt} />
            </h5>
        </article>
    );
};

export default PostsExcerpt;