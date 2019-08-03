import React from 'react';
import Sidebar from '../sidebar';
import ChannelContainer from '../channel/channel';
import ChannelsIndexContainer from '../channel/channels_index';

class Homepage extends React.Component {

    render() {
        document.body.classList.add("no-scroll")
        return (
            <div className="home-container">
                <div className="sidebar">
                    <ChannelsIndexContainer/>
                </div>
                {/* <Sidebar/> */}
                {this.props.selected && <ChannelContainer />}
            </div>
        );
    }
}

export default Homepage;