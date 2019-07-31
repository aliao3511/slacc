import React from 'react';

const Slide = ({ image }) => {
    return (
        <div className="slide">
            <img src={`assets/${image}`} alt=""/>
        </div>
    );
};

export default Slide;