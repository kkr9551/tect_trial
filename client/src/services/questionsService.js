import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/questions/`;

/**create new question */
const createQuestion = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

/**get all questions */
const getAllQuestions = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

/**get a question */
const getQuestion = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
}

/** delete question */
const deleteQuestion = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
}

const questionsService = {
    createQuestion,
    getAllQuestions,
    getQuestion,
    deleteQuestion,
};

export default questionsService;