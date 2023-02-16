import React from 'react';
import "./Search.css";


const Search = ({value, onChange}) => {
    return (
        <div className='search-bar'>
            
            <input 
                className='search-input'
                type="text"
                name='search' 
                placeholder="Search evidence"
                value={value}
                onChange={onChange} />
        </div>
    );
}

export default Search;