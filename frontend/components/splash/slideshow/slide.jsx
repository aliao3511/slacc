import React from 'react';

const Slide = ({ image }) => {
    // this does not work
    // const style = {
    //     backgroundImage: `url(${image})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    // }

    return (
        // <div className="slide" style={style}>
        <div className="slide">
            {/* this works */}
            <img src={`assets/${image}`} alt=""/> 
        </div>
    );
};

export default Slide;