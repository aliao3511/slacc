import React from 'react';
import { connect } from 'react-redux';
import { getChannels, selectChannel } from '../../actions/channel_actions';
import ChannelsIndexItem from './channels_index_item';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

const mapStateToProps = (state, ownProps) => {
    let subscribedChannels = {};
    debugger
    state.entities.users[state.session.id].channel_ids.forEach( id => {
        if (state.entities.channels[id]) {
            subscribedChannels[id] = state.entities.channels[id];
        }
    });
    if (ownProps.location.pathname.includes('preview')) {
        debugger
        let previewedChannels = {};
        if (state.entities.channels[ownProps.match.params.channelId]) {
            previewedChannels = { [ownProps.match.params.channelId]: state.entities.channels[ownProps.match.params.channelId]};
        }
        subscribedChannels = merge(previewedChannels, subscribedChannels);
    }
    return {
        currentUser: state.entities.users[state.session.id],
        channels: Object.values(subscribedChannels),
    }
};

const mapDispatchToProps = dispatch => ({
    getChannels: userId => dispatch(getChannels(userId)),
    // selectChannel: channelId => dispatch(selectChannel(channelId)),
});

class ChannelsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { currentUser, getChannels, selected, selectChannel } = this.props;
        debugger
        getChannels();
    }

    select(id) {
        const { selectChannel } = this.props;
        return e => {
            this.props.history.push(`/home/channels/${id}`);
        }
    }

    render() {
        const prevPath = this.props.location.pathname;
        debugger
        return (
            <div className="index-container">
                <Link to='/add-channel' className="tooltip">Channels</Link>
                <Link className="create-channel" to={{ pathname: '/create-channel', state: { prevPath: prevPath}}}></Link>
                <ul className="channels-index">
                    {this.props.channels.map(channel => 
                        <ChannelsIndexItem key={channel.id} 
                            channel={channel}
                            select={this.select(channel.id)}
                            className={(channel.id == this.props.match.params.channelId) ? 'selected-channel' : 'unselected'}
                        />)}
                </ul>

            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex));