import React from 'react';

const People = (props) => {
    return (
        <div className='peopleCard'>
            <img className='peopleImage' src={props.url} alt='peopleImage'/>
            <h4 className='researcherName'>{props.name}</h4>
            <p className='contactAddr'>{props.eAddr}</p>
            
            
        </div>
    );
};

export default People;