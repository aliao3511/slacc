import React from 'react';
import Sidebar from '../sidebar';

class Homepage extends React.Component {
    render() {
        return (
            <div className="home-container">
                <Sidebar/>
                <div>INSERT CHANNELS HERE</div>
            </div>
        );
    }
}

export default Homepage;