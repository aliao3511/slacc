import React from 'react';
import Sidebar from '../sidebar';
import ChannelContainer from '../channel/channel';
import SideBar from '../channel/channels_index';

class Homepage extends React.Component {

    render() {
        document.body.classList.add("no-scroll");
        document.documentElement.classList.add("no-scroll");
        return (
            <div className="home-container">
                <Sidebar />
                {this.props.selected && <ChannelContainer />}
            </div>
        );
    }
}

export default Homepage;