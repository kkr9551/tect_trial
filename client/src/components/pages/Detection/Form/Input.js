import React from "react";
import "./Input.css";


const Input = ({id, label, placeholder, type, required, value, multiple, accept, onChange}) => {
    return(
        <>
            <div className='input-group'>
                <label htmlFor={id}>{label}</label>
                <input 
                    id={id} 
                    type={type} 
                    placeholder={placeholder} 
                    value={value} 
                    required={required} 
                    accept={accept}
                    multiple={multiple}
                    onChange={onChange}
                    className={id === "inputFile" ? "input-file" : ""} />
            </div>
        </>
    );
};

export default Input;