import React from 'react';
import { connect } from 'react-redux';
import { getChannels, selectChannel } from '../../actions/channel_actions';
import ChannelsIndexItem from './channels_index_item';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    const subscribedChannels = {};
    debugger;
    state.entities.users[state.session.id].channel_ids.forEach( id => {
        if (state.entities.channels[id]) {
            subscribedChannels[id] = state.entities.channels[id] 
        }
    });
    return {
        currentUser: state.entities.users[state.session.id],
        channels: Object.values(subscribedChannels),
        selected: state.ui.selected.id || 1, 
    }
};

const mapDispatchToProps = dispatch => ({
    getChannels: userId => dispatch(getChannels(userId)),
    selectChannel: id => dispatch(selectChannel(id)),
});

class ChannelsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { currentUser, getChannels, selected, selectChannel } = this.props;
        // if (currentUser) {
        //     getChannels(currentUser.id);
        // } else {
            getChannels().then(() => selectChannel(selected));
        // }
    }

    select(id) {
        const { selectChannel } = this.props;
        return e => {
            selectChannel(id);
        }
    }

    render() {
        const { selected } = this.props;
        return (
            <div className="index-container">
                <h1>Channels</h1>
                <Link className="create-channel" to='/create-channel'>Create Channel</Link>
                <ul className="channels-index">
                    {this.props.channels.map(channel => 
                        <ChannelsIndexItem key={channel.id} 
                            channel={channel}
                            select={this.select(channel.id)}
                            className={(channel.id === selected) ? 'selected-channel' : 'unselected'}
                        />)}
                </ul>
                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex);