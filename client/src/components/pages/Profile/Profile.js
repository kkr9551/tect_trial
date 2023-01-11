import React, { useState, useEffect } from 'react';
//import Footer from '../../commonUI/footer/footer';
import { /**Container, Col, Row,*/ Spinner } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
//import UserWidget from './UserWidget';
//import UserPosts from './UserPosts';
//import PostsWidget from './PostsWidget';
import Card from "../../Widgets/Card";
import useRedirectLoggedOutUser from '../../../custom hook/UseRedirectLoggedOutUser';
import { getUserProfile } from "../../../services/authServices";
import { setName, setUser } from '../../../states/AuthSlice';
import "./Profile.css";

const Profile = () => {
    useRedirectLoggedOutUser('/login')
    const [profile, setProfile] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Getting use");
        setIsLoading(true);
        async function getUserData() {
            const data = await getUserProfile();
            console.log(data);

            setProfile(data);
            setIsLoading(false);
            dispatch(setUser(data));
            dispatch(setName(data.userName));
        }
        getUserData();
    }, [dispatch]);
    
    return(
        <div className="profile">
            {isLoading && (<Spinner />)}
            <>
                {!isLoading && profile === null ? 
                (<p>Something went wrong, please try again</p>) : 
                (<Card className="profileCard">
                    <span className='profile-photo'>
                        <img alt='profilepic' />
                    </span>
                    <span className='profile-data'>
                        <p>
                            <b>Name : </b>
                        </p>
                        <p>
                            <b>Email : </b>
                        </p>
                        <p>
                            <b>Cases : </b>
                        </p>
                        <div>
                            <Link to='/edit-profile'>
                                <button className='edit-btn'>Edit profile</button>
                            </Link>
                        </div>
                    </span>
                </Card>)}
            </>
        </div>
    );
    /*const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const getUser = async () => {
        const reponse = await fetch(
            `http://localhost:5000/users/${userId}`, 
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            }
        );
        const data = await reponse.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);
    if (!user) {
        return null;
    }

    return(
    <>
        <Container fluid>
            <Row>
                <Col>
                    <div className="profile-panel">
                        <UserWidget userId={userId} picturePath={user.picturePath} />
                    </div>
                </Col>
                <Col>
                    <div className="userPosts">
                        <div className="posts-display">
                            <PostsWidget />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
    );*/
}

export default Profile;