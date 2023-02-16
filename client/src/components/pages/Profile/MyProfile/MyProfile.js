import React, { useState, useEffect } from 'react';
import UseRedirectLoggedOutUser from '../../../../custom hook/UseRedirectLoggedOutUser';
import "./MyProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setName } from '../../../../states/AuthSlice';
import { getUser } from '../../../../services/authServices';
import { SpinnerImg } from '../../../Widgets/Loader/Loader';
//import Card from '../../../Widgets/Card';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    UseRedirectLoggedOutUser("/login");
    
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function getUserData () {
            const data = await getUser();
            console.log(data);
            setProfile(data);
            setIsLoading(false);
            dispatch(setUser(data));
            dispatch(setName(data.name));
        }
        getUserData();
    }, [dispatch])
    
    return (
        <div className='profile'>
            {isLoading && <SpinnerImg />}
            <>
            {
                !isLoading && profile === null ? (
                    <p>Something went wrong, please reload the page</p>
                ) : (
                    <div className='pCard'> 
                        <span className='profile-photo'>
                            <img src={profile?.picturePath} alt="profilePic" id='profile-img' />
                        </span>
                        <span className='profile-data'>
                            <p>
                                <b>Name: </b> {profile?.name}
                            </p>
                            <p>
                                <b>Email: </b> {profile?.email}
                            </p>
                            <p>
                                <b>Self Introduction: </b> {profile?.selfIntro}
                            </p>
                            <div>
                                <Link to="/edit-profile">
                                    <button className="editBtn">Edit Profile</button>
                                </Link>
                            </div>
                        </span>
                    </div>
                    
                )
            }
            </>
        </div>
    );
};

export default MyProfile;