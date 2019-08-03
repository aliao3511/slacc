import React from 'react';
import Sidebar from '../sidebar';
import ChannelContainer from '../channel/channel';
import ChannelsIndexContainer from '../channel/channels_index';

class Homepage extends React.Component {

    render() {
        debugger
        return (
            <div className="home-container">
                {/* <Sidebar/> */}
                <ChannelsIndexContainer/>
                {this.props.selected && <ChannelContainer />}
            </div>
        );
    }
}

export default Homepage;