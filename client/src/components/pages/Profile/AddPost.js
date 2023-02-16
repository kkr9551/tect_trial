import React, {useState} from 'react';
import PostForm from './Post/PostForm/PostForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading, createPost } from '../../../states/PostsSlice';
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
    const [visibility, setVisibility] = useState("");

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

    const handleSelectChange = (e) => {
        setVisibility(e.target.value);
    }

    const savePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("tags", tags.split(","));
        formData.append("content", content);
        formData.append("image", postImage);
        formData.append("visibility", visibility);

        console.log(...formData);

        await dispatch(createPost(formData));

        navigate('/dashboard');
    };

    return (
        <div>
            {isLoading && <Loader />}
            
            <PostForm 
                post={post}
                postImage={postImage}
                imagePreview={imagePreview}
                content={content}
                setContent={setContent}
                visibility={visibility}
                handleSelectChange={handleSelectChange}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                savePost={savePost} 
            />
        </div>
        
    );
};

export default AddPost;