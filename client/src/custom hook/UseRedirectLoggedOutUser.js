
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLoginStatus } from '../services/authServices';
import { setLogin } from '../states/AuthSlice';

const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectLoggedOutUser = async (user) => {
            const isLoggedIn = await getLoginStatus();
            dispatch(setLogin(isLoggedIn));

            if (!isLoggedIn) {
                toast.info("Session expired, please log in to continue");
                navigate(path);
            }
        };
        redirectLoggedOutUser();
    }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;