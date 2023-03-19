import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLogin, setName } from '../../../../states/AuthSlice';
//import Dropzone from "react-dropzone";
import "./Login.css";
//import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../../../services/authServices';
import Loader from '../../../Widgets/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
    email: "",
    password: "",
};

const Input = ({id, type, label, value, onChange, required, name}) => {
    return (
    <>
        <div className='login-input-group'>
                <label htmlFor={id}>{label}</label>
                <input 
                    id={id} 
                    type={type} 
                    value={value} 
                    name={name} 
                    onChange={onChange}
                    required={required}
                />
        </div>
    </>
    )
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const{email, password} = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const login = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("All fields are required");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }

        const userData = {email, password};
        setIsLoading(true);

        try {
            const data = await loginUser(userData);
            console.log(data);
            dispatch(setLogin(true));
            dispatch(setName(data.name));
            navigate('/dashboard');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    return(
        <div className="loginContainer">
            <h1 className='logIn-title'>Welcome to TECT</h1>
            {isLoading && (<Loader />)}
                <form className='loginForm' onSubmit={login}>
                    <div className="loginform-box">
                        <Input
                            label="Email Address"
                            onChange={handleInputChange}
                            value={email}
                            name="email"
                            id='emailAddress'
                        />
                        
                        <Input
                            label="Password"
                            type="password"
                            onChange={handleInputChange}
                            value={password}
                            name="password"
                            id='password'
                        />
                        
                    </div>

                    <div className='loginbtns'>
                        <button
                            type="submit"
                            className='submitBtn'
                            id='btn'
                        >
                            LOG IN
                        </button>
                        <div className="loginlinks">
                            <p className="changeform">
                                &nbsp; Don't have an account? &nbsp; 
                            </p>
                            <Link to='/register' className='linkTR'>Register now</Link>
                        </div>
                        <div className='resetpw'>
                            <Link to="/reset" className="linkRestPw">Forgot your password?</Link>
                        </div>
                        
                    </div>
                </form>

        </div>
    );
    
}

export default Login;