import React, { useEffect } from 'react';
import "./PostSummary.css";
import { FaHandsHelping } from "react-icons/fa";
import { BsPinAngleFill, /*BsPatchQuestionFill*/ } from "react-icons/bs";
import { GrDocumentStore } from "react-icons/gr"
import InfoBox from "./InfoBox/InfoBox";
import { useDispatch, useSelector } from 'react-redux';
import { CALC_TOTAL_THANKS, selectTotalReceivedThanks } from '../../../../../states/PostsSlice';
import { MdReviews } from "react-icons/md";

//icons
const thankfulIcon = <FaHandsHelping size={40} color="#fff" />;
const pinnedIcon = <BsPinAngleFill size={40} color="#fff" />;
const sumIcon = <GrDocumentStore size={40} color="#fff" />;
const reviewIcon = <MdReviews size={40} color="#fff" />;

const PostSummary = ({posts}) => {
    //const totalThanks = posts.filter((elem) => elem.appreciations.length > 0).map((elem => elem.appreciations.length)).reduce((accum, curre) => accum + curre);
    const dispatch = useDispatch();
    const totalThanks = useSelector(selectTotalReceivedThanks);

    useEffect(() => {
        dispatch(CALC_TOTAL_THANKS(posts))
    }, [dispatch, posts]);

    return (
        <div className='postSummary'>
            <h2 className='--mt'>Evidence Summary</h2>
            <div className='infoSummary1'>
                
                <InfoBox 
                    icon={sumIcon} 
                    title={"Total pieces of evidence"} 
                    count={posts.length} 
                    bgColor="card1" />
                <InfoBox
                    icon={pinnedIcon} 
                    title={"Received marks"}
                    count={"0"}
                    bgColor="card2" />
            </div>
            <div className='infoSummary2'>
                <InfoBox 
                    icon={reviewIcon}
                    title={"Received comments"}
                    count={"0"}
                    bgColor="card3" />
                <InfoBox
                    icon={thankfulIcon}
                    title={"Received appreciations"}
                    count={totalThanks}
                    bgColor="card4" />
            </div>    

            
        </div>
    );
};

export default PostSummary;