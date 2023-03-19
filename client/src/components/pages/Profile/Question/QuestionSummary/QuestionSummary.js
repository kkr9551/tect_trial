import React from 'react';
import InfoBox from '../../Post/PostSummary/InfoBox/InfoBox';
import { FaHandsHelping } from "react-icons/fa";
import { BsPinAngleFill, /*BsPatchQuestionFill*/ } from "react-icons/bs";
import { GrDocumentStore } from "react-icons/gr"
import { MdReviews } from "react-icons/md";
import "./QuestionSummary.css";

//ICONS
const thankfulIcon = <FaHandsHelping size={40} color="#fff" />;
const pinnedIcon = <BsPinAngleFill size={40} color="#fff" />;
const sumIcon = <GrDocumentStore size={40} color="#fff" />;
const reviewIcon = <MdReviews size={40} color="#fff" />;

const QuestionSummary = ({questions}) => {
    return (
        <div className='questionSummary'>
            <h2 className='--mt'>Question Summary</h2>
            <div className='infoSummary1'>
                <InfoBox
                    icon={sumIcon} 
                    title={"Total questions"} 
                    count={questions.length} 
                    bgColor="card1" 
                />
                <InfoBox
                    icon={pinnedIcon} 
                    title={"Total marks"} 
                    count={"0"} 
                    bgColor="card2" 
                />
            </div>
            <div className='infoSummary2'>
                <InfoBox
                    icon={reviewIcon}
                    title={"Total comments"}
                    count={"0"}
                    bgColor="card3" 
                />
                <InfoBox
                    icon={thankfulIcon}
                    title={"Received appreciations"}
                    count={"0"}
                    bgColor="card4" 
                />
            </div>
        </div>
    );
};

export default QuestionSummary;