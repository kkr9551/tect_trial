import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/posts/`;

// create new product
const createPost = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

//get all posts
const getAllPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

//delete a post
const deletePost = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

//get a post
const getPost = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

//get a public post


/**update a post */
const updatePost = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

/**get specific posts */
const getAllPublicPosts = async () => {
    const response = await axios.get(`${API_URL}visibility`);
    return response.data;
}

/**get a post's visibility status */
const getVisibilityStatus = async (id) => {
    const response = await axios.get(`${API_URL}${id}/visibility`);
    return response.data;
}

/**get a single public post */
const getPublicPost = async (id) => {
    const response = await axios.get(API_URL + id + '/public');
    return response.data;
}

/**add a mark */
const markPost = async (id) => {
    const response = await axios.post(`${API_URL}${id}/marked`);
    return response.data;
};

/**thank a post */
const thankPost = async (id) => {
    const response = await axios.put(`${API_URL}${id}/thank`);
    console.log(response.data);
    return response.data;
};

/**cancel thank */
const nonthankPost = async (id) => {
    const response = await axios.put(`${API_URL}${id}/nonthank`);
    console.log(response.data);
    return response.data;
}

/**when we want to process the async func createPost, we need this exported postService */
const postsService = {
    createPost,
    getAllPosts,
    deletePost,
    getPost,
    updatePost,
    getAllPublicPosts,
    getVisibilityStatus,
    getPublicPost,
    markPost,
    thankPost,
    nonthankPost,
};

export default postsService;