import React from 'react';
import { selectName } from '../../states/AuthSlice';
import "./HeaderForD.css";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../services/authServices';
import { setLogin } from '../../states/AuthSlice';
import { useNavigate } from 'react-router-dom';

const HeaderForD = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const name = useSelector(selectName)

    const logout = async () => {
        await logoutUser();
        dispatch(setLogin(false));
        navigate("/");
    };

    return (
        <div className='--pad header'>
            <div className='--flex-between'>
                <h3 className='welcome'>
                    <span style={{fontWeight: 'bold'}}>Welcome, </span>
                    <span style={{color: 'red'}}>{name}</span>
                </h3>
                <button onClick={logout} className="dashboard-btn">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default HeaderForD;