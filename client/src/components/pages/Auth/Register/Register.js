import React, {useState} from 'react';
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../../../services/authServices"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin, setName } from "../../../../states/AuthSlice";
import Loader from "../../../Widgets/Loader/Loader";
import "./Register.css";

const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
}

const Input = ({id, type, label, value, onChange, required, name}) => {
    return (
        <>
            <div className='input-group-register'>
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
//It is possible to put two components in one js file, 
//but don't put the side component into the main component rendeing function
//Here if you put the Input component inside the Register component, 
//React would probably looses track of the Input component. 
//When users type in the field, they cannot smoothly type because react loses the focus of the input field when re-rendering.

const Register = () => {
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {name, email, password, password2} = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const register = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error("All fields are required");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }
        if (name.length < 4) {
            return toast.error("User name must be at least 5 characters");
        }
        if (password.length < 7) {
            return toast.error("Password must be at least 7 characters");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
        
        const userData = {name, email, password};

        setIsLoading(true);

        try {
            const data = await registerUser(userData);
            console.log(data);
            dispatch(setLogin(true));
            dispatch(setName(data.name));
            navigate("/login");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <div className='registerContainer'>
            <h1 className='register-title'>Welcome to TECT</h1>
            {isLoading && (<Loader />)}
                    <form onSubmit={register} className='registerForm'>
                        <div className="form-box">
                        <Input 
                            type="text"
                            label="User Name"
                            onChange={handleInputChange}
                            value={name}
                            name="name"
                            id="name"/>
                        <Input 
                            type="email"
                            label="Email Address"
                            onChange={handleInputChange}
                            value={email}
                            name="email"
                            id="email"/>
                        <Input 
                            type="password"
                            label="Password"
                            onChange={handleInputChange}
                            value={password}
                            name="password"
                            id="password"/>
                        <Input 
                            type="password"
                            label="Confirm Password"
                            onChange={handleInputChange}
                            value={password2}
                            name="password2"
                            id="password2"/>

                        <div className='register-btns'>
                            <button
                                type="submit"
                                className='submitBtn'
                                id='btn'
                            >
                                Register
                            </button>
                        </div>
                        <div className="links">
                            <p className="changeform-register">
                                &nbsp; Already have an account? &nbsp; 
                            </p>
                            <Link to='/login' className='linkTL'>Log in</Link>
                        </div>
                        </div>
                    </form>
        </div>
    )
}

export default Register;