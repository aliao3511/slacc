import React from 'react';

const Slide = ({ image }) => {
    const { url, description } = image;
    return (
        <div className="slide">
            <img src={url} alt={description}/> 
        </div>
    );
};

export default Slide;