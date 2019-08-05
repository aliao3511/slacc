import React from 'react';
import { connect } from 'react-redux';
import { getChannels, selectChannel } from '../../actions/channel_actions';
import ChannelsIndexItem from './channels_index_item';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

const mapStateToProps = state => {
    let subscribedChannels = {};
    state.entities.users[state.session.id].channel_ids.forEach( id => {
        if (state.entities.channels[id]) {
            subscribedChannels[id] = state.entities.channels[id];
        }
    });
    if (state.ui.selected.id) {
        const previewedChannels = { [state.ui.selected.id]: state.entities.channels[state.ui.selected.id]};
        subscribedChannels = merge(previewedChannels, subscribedChannels);
    }
    return {
        currentUser: state.entities.users[state.session.id],
        channels: Object.values(subscribedChannels),
        selected: state.ui.selected.id || 1, 
    }
};

const mapDispatchToProps = dispatch => ({
    getChannels: userId => dispatch(getChannels(userId)),
    selectChannel: channelId => dispatch(selectChannel(channelId)),
});

class ChannelsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { currentUser, getChannels, selected, selectChannel } = this.props;
        getChannels().then(() => selectChannel(selected));
    }

    select(id) {
        const { selectChannel } = this.props;
        return e => {
            selectChannel(id);
            if (this.props.location.pathname === '/preview') {
                this.props.history.push('/home');
            }
        }
    }

    render() {
        const { selected } = this.props;
        return (
            <div className="index-container">
                <Link to='/add-channel' className="tooltip">Channels</Link>
                <Link className="create-channel" to='/create-channel'></Link>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex));