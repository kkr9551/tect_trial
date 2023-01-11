import axios from "axios";
import { toast } from "react-toastify";

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**register user */
/*export const registerUser = async (userData) => {
    try {
        const response = await axios.post()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};*/

/**login user */
/*export const loginUser = async (userData) => {
    try {
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};*/

/**logout user */
/*export const logoutUser = async (userData) => {
    try {
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};*/

/**get login status */
export const getLoginStatus = async () => {
    const url = 'http://localhost:5000/users/loggedin';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

/**get user profile */
export const getUserProfile = async () => {
    const url = 'http://localhost:5000/users/getuser';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
}