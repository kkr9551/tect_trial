import React, {useState} from 'react';
import PostForm from './PostForm/PostForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading } from '../../../states/PostsSlice';
import { createPost } from '../../../services/postsService';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Widgets/Loader/Loader';

//since input form for text input contains only two fields: title and tags, we don't need to set all types of input fields in the initialState 
const initialState = {
    title: "",
    tags: "",
};

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [post, setPost] = useState(initialState);
    const [postImage, setPostImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [content, setContent] = useState("");

    const isLoading = useSelector(selectIsLoading);

    const {title, tags} = post;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPost({...post, [name]: value});
    };

    const handleImageChange = (e) => {
        setPostImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const savePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("tags", tags);
        formData.append("content", content);
        formData.append("image", postImage);

        console.log(...formData);

        dispatch(createPost(formData));

        navigate('/dashboard');
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className='addEviTitle'>Add new evidence</h3>
            <PostForm 
                post={post}
                postImage={postImage}
                imagePreview={imagePreview}
                content={content}
                setContent={setContent}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                savePost={savePost}
            />
        </div>
        
    );
};

export default AddPost;