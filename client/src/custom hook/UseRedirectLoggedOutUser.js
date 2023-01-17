import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLoginStatus } from '../services/authServices';
import { setLogin } from '../states/AuthSlice';
import { toast } from 'react-toastify';

const UseRedirectLoggedOutUser = (path) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus();
            dispatch(setLogin(isLoggedIn));

            if (!isLoggedIn) {
                toast.info("Please log in to continue");
                navigate(path);
                return;
            }
        };
        redirectLoggedOutUser();
    }, [navigate, path, dispatch]);
}

export default UseRedirectLoggedOutUser;
