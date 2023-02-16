import React from 'react';
import "./PostSummary.css";
import { FaHandsHelping } from "react-icons/fa";
import { BsPinAngleFill, BsPatchQuestionFill } from "react-icons/bs";
import { GrDocumentStore } from "react-icons/gr"
import InfoBox from "./InfoBox/InfoBox";

//icons
const thankfulIcon = <FaHandsHelping size={40} color="#fff" />;
const pinnedIcon = <BsPinAngleFill size={40} color="#fff" />;
const sumIcon = <GrDocumentStore size={40} color="#fff" />;
const questionedIcon = <BsPatchQuestionFill size={40} color="#fff" />;

const PostSummary = ({posts}) => {
    return (
        <div className='postSummary'>
            <h2 className='--mt'>Evidence summary</h2>
            <div className='infoSummary1'>
                
                <InfoBox 
                    icon={sumIcon} 
                    title={"Total pieces of evidence"} 
                    count={posts.length} 
                    bgColor="card1" />
                <InfoBox
                    icon={pinnedIcon} 
                    title={"Times of being marked"}
                    count={"0"}
                    bgColor="card2" />
            </div>
            <div className='infoSummary2'>
                <InfoBox 
                    icon={questionedIcon}
                    title={"Times of being questioned"}
                    count={"0"}
                    bgColor="card3"/>
                <InfoBox
                    icon={thankfulIcon}
                    title={"Received appreciations"}
                    count={"0"}
                    bgColor="card4"/>
            </div>    

            
        </div>
    );
};

export default PostSummary;