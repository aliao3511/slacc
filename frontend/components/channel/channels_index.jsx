import React from 'react';
import { connect } from 'react-redux';
import { getChannels, selectChannel } from '../../actions/channel_actions';
import ChannelsIndexItem from './channels_index_item';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

const mapStateToProps = (state, ownProps) => {
    let subscribedChannels = {};
    state.entities.users[state.session.id].channel_ids.forEach( id => {
        if (state.entities.channels[id]) {
            subscribedChannels[id] = state.entities.channels[id];
        }
    });
    if (ownProps.location.pathname.includes('preview')) {
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
});

class ChannelsIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { currentUser, getChannels, selected, selectChannel } = this.props;
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
        return (
            <div className="index-container">
                <div className="tooltip">
                    <Link to='/add-channel'>Channels</Link>
                    <span className="tooltip-text">Browse all channels</span>
                </div>
                <div className="tooltip">
                    <Link className="create-channel" to={{ pathname: '/create-channel', state: { prevPath: prevPath}}}></Link>
                    <span className="tooltip-text create">Create a channel</span>
                </div>
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