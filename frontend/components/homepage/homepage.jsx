import React from 'react';
import Sidebar from '../sidebar';
import ChannelContainer from '../channel/channel';
import SideBar from '../channel/channels_index';

class Homepage extends React.Component {

    render() {
        // document.body.classList.add("no-scroll");
        return (
            <div className="home-container no-scroll">
                <Sidebar />
                {this.props.channels.length > 0 && <ChannelContainer />}
            </div>
        );
    }
}

export default Homepage;