import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectPost, getPost, getAllPosts, updatePost } from '../../../states/PostsSlice';
import PostForm from './Post/PostForm/PostForm';
import Loader from '../../Widgets/Loader/Loader';

const EditPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const isLoading = useSelector(selectIsLoading);

    const evidenceEdit = useSelector(selectPost);

    const [post, setPost] = useState(evidenceEdit);
    const [postImage, setPostImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [content, setContent] = useState("");
    const [visibility, setVisibility] = useState("");

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    useEffect(() => {
        setPost(evidenceEdit);
        setImagePreview(
            evidenceEdit && evidenceEdit.image ? 
            `${evidenceEdit.image.filePath}` : null
        );
        setContent(
            evidenceEdit && evidenceEdit.content ?
            evidenceEdit.content : ""
        );
    }, [evidenceEdit]);

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

        formData.append("title", post?.title);
        formData.append("tags", post?.tags);
        formData.append("content", content);
        formData.append("visibility", visibility);
        if (postImage) {
            formData.append("image", postImage);
        }

        console.log(...formData);

        dispatch(updatePost({id, formData}));
        dispatch(getAllPosts());
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

export default EditPost;