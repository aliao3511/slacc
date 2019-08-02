import React from 'react';
import Sidebar from '../sidebar';
import Channel from '../channel/channel';
import ChannelsIndexContainer from '../channel/channels_index';

class Homepage extends React.Component {
    render() {
        return (
            <div className="home-container">
                {/* <Sidebar/> */}
                <ChannelsIndexContainer />
                <Channel />
            </div>
        );
    }
}

export default Homepage;