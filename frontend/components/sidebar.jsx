import React from 'react';
import ChannelsIndexContainer from './channel/channels_index';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
})

class Sidebar extends React.Component {
    render() {
        const { currentUser } = this.props;
        return (
            <div className="sidebar">
                <div className="header">
                    <h1>WORKSPACE</h1>
                    <p>{currentUser.username}</p>
                </div>
                <div className="channels-index">
                    <ChannelsIndexContainer/>
                </div>
                <div className="dms-index">
                    DIRECT MESSAGES
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Sidebar);