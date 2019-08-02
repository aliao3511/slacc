import React from 'react';
import { connect } from 'react-redux';
import { getChannels } from '../../actions/channel_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels),
});

const mapDispatchToProps = state => ({
    getChannels: userId => dispatch(getChannels(userId)),
});

class ChannelsIndex extends React.Component {

    componentDidMount() {
        const { currentUser, getChannels } = this.props;
        debugger
        if (currentUser) {
            getChannels(currentUser.id);
        } else {
            getChannels();
        }
    }

    render() {
        return (
            <ul>
                {this.props.channels.map(channel => <li key={channel.id}>{channel.name}</li>)}
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex);