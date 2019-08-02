import React from 'react';
import Sidebar from '../sidebar';
import Channel from '../channel/channel';

class Homepage extends React.Component {
    render() {
        return (
            <div className="home-container">
                <Sidebar/>
                <Channel />
            </div>
        );
    }
}

export default Homepage;