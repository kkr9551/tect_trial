import React, { useState } from 'react';
import { Formik } from "formik";
//due to the limitations of creating a form with html, we selected Formik package because it keeps track of not only values but also validations and error messages 
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin, setName } from '../../../states/AuthSlice';
import Dropzone from "react-dropzone";
import "./Form.css";
import { MdOutlineEdit } from "react-icons/md";
//import { toast } from 'react-toastify';
//import { validateEmail } from '../../../services/authServices';

const registerSchema = yup.object().shape({
    userName: yup.string().min(5, "Must be 5 characters or longer").required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(7, "Must be 7 characters on longer").required("Required"),
    picture: yup.string().required("Required")
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
});

/**first we set the initial value for two situations: register and login
 * then we pass the useFormik hook the initial values
 */
const initialValuesRegister = {
    userName: "",
    email: "",
    password: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    /**register user */
    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        /*if (!formData.userName || !formData.email || !formData.password) {
            return toast.error("All fields are required");
        }
    
        if (!validateEmail(formData.email)) {
            return toast.error("Please enter a valid email address");
        }*/

        const savedUserResponse = await fetch(
            "http://localhost:5000/auth/register", 
            {
                method: "POST",
                body: formData
            });

            const savedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();

            if (savedUser) {
                setPageType('login');
            }
    }; 

    const login = async (values, onSubmitProps) => {
        const loggedInUserResponse = await fetch(
            "http://localhost:5000/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        );

        /*
        if (!values.email || !values.password) {
            return toast.error("All fields are required");
        }

        if (!validateEmail(values.email)) {
            return toast.error("Please enter a valid email address");
        }*/

        const loggedIn = await loggedInUserResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(setLogin(true/*{
                user: loggedIn.user,
                token: loggedIn.token
            }*/));
            dispatch(setName(loggedIn.name));
            navigate("/profile");
        } else {
            navigate("/login");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) {
            await login(values, onSubmitProps);
        } else if (isRegister) {
            await register(values, onSubmitProps);
        }
    };

    const Input = ({id, type, label, value, onChange, onBlur, name}) => {
        return (
        <>
            <div className='input-group'>
                    <label htmlFor={id}>{label}</label>
                    <input 
                        id={id} 
                        type={type} 
                        value={value} 
                        name={name} 
                        onChange={onChange}
                        onBlur={onBlur}
                    />
            </div>
        </>
        )
    };

    return(
        <Formik
            onSubmit={handleFormSubmit}
            /**passing the hook initial values we have set as well as a onSubmit callback function */
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="form-box">
                        {isRegister && (
                            <>
                                <Input
                                    id="username"
                                    label="User name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userName}
                                    name="userName"
                                />
                                {Boolean(touched.userName) && Boolean(errors.userName) ? 
                                (<div className="inform-errors">{touched.userName && errors.userName}</div>) : null}

                                <div className="dropzone-box">
                                    <Dropzone
                                        acceptedFiles=".jpg, .jpeg, .png"
                                        multiple={false}
                                        onDrop={
                                            (acceptedFiles) => setFieldValue(
                                                "picture", 
                                                acceptedFiles[0]
                                            )
                                        }
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <div 
                                                {...getRootProps()}
                                                className="dropzone"
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add picture here</p>
                                                ) : (
                                                    <>
                                                        <p>{values.picture.name}</p>
                                                        <MdOutlineEdit/>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                            </>
                        )}
                        
                        <Input
                            label="Email Address"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            id='emailAddress' 
                        />
                        {Boolean(touched.email) && Boolean(errors.email) ? 
                        (<div className="inform-errors">{errors.email}</div>) : null}

                        <Input
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            id='password'
                        />
                        {Boolean(touched.password) && Boolean(errors.password) ? 
                        (<div className="inform-errors">{touched.password && errors.password}</div>) : null}
                    </div>

                    <div className='btns'>
                        <button
                            type="submit"
                            className='submitBtn'
                            id='btn'
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </button>
                        <p
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            className="changeform"
                        >
                            {
                                isLogin ? 
                                "Don't have an account? Sign up here" : 
                                "Already have an account? Log in here"
                            }
                        </p>
                        <p 
                            onClick={() => navigate("/reset")}
                            className="resetPW"
                        >
                            Forgot your password?
                        </p>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Form;

