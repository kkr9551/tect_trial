import React from "react";
import Form from "./Form";
import "./Login.css";


const Login = () => {
    

    return (
    <>
        <div className="login-container">
            <h1>Welcome to TECT</h1>
            <Form className="auth-form" />  
        </div>
    </>
    )
}

export default Login;