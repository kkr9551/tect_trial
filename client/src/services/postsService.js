import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/posts`;

// create new product
export const createPost = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

/**when we want to process the async func createPost, we need this exported postService */
const postsService = {
    createPost
};

export default postsService;