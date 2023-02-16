import React, { useState } from 'react';
import "./EditProfile.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../states/AuthSlice';
import Loader from '../../../Widgets/Loader/Loader';
import Card from '../../../Widgets/Card';

const Input = ({id, type, label, value, onChange, name, disabled}) => {
    return (
        <>
            <div className='input-group-editP'>
                    <label htmlFor={id}>{label}</label>
                    <input 
                        id={id} 
                        type={type} 
                        value={value} 
                        name={name} 
                        onChange={onChange}
                        disabled={disabled}
                    />
            </div>
        </>
    )
};

/*const TextArea = ({id, type, label, value, onChange, name}) => {
    return(
        <>
            <div className='textarea-editP'>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
            </div>
        </>
    );
};*/

const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(selectUser);

    const initialState = {
        name: user?.name,
        email: user?.email,
        picturePath: user?.picturePath,
    };

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const saveProfile = (e) => {
        e.preventDefault();
    };

    return (
        <div className='profile'>
            {isLoading && <Loader />}
            <Card cardClass={"profileCard"}> 
                <span className='profile-photo'>
                    <img src={user?.picturePath} alt="profilePic" id='profile-img' />
                </span>
                <form onSubmit={saveProfile} className="editProfileForm">
                <span className='profile-data'>
                    <p>
                        <Input
                            type="text"
                            label="User name"
                            onChange={handleInputChange}
                            id="name"
                            value={profile?.name}
                            name="name"
                        />
                    </p>
                    <p>
                        <Input 
                            type="email"
                            label="Email address"
                            id="email"
                            value={profile?.email}
                            name="email"
                            disabled
                        />
                        <br />
                        <code>Email cannot be changed</code>
                    </p>
                    <p>
                        <Input
                            type="file"
                            label="User picture"
                            id="image"
                            name="picturePath"
                            onChange={handleImageChange}
                        />
                    </p>       
                    <div>
                        <button className="editBtn">Edit Profile</button>
                    </div>
                </span>
                </form>
            </Card>
        </div>
    );
};

export default EditProfile;