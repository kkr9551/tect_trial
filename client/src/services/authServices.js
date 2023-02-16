import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**register user */
export const registerUser = async (userData) => {
    try {
        //as we register a user, we trigger a cookie in the backend URL and the info will be stored in the frontend so that the frontend can know if the user is looged in. 
        //so we need to specify a property to get that cookie and store it in the browser.  
        const response = await axios.post(
            `${BACKEND_URL}/api/auth/register`, 
            userData, {withCredentials: true}
        );
        if (response.statusText === "OK") {
            //statusText is a read-only property of the res interface
            //it contains the state message corresponding to the http status code (res.status)
            //code 200 : "OK", code 100 : "Continue", code 404 : "Not found"
            toast.success("Log in successfully");
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

/**login user */
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/auth/login`, userData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

/**logout user */
export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/auth/logout`);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

/**get login status */
/** this async function is intended to prevent losing all redux when users refresh the page */
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

/**get user data */
export const getUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

/**update user profile */


