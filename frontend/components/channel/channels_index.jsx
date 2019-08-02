import React from 'react';
import { connect } from 'react-redux';
import { getChannels, selectChannel } from '../../actions/channel_actions';
import ChannelsIndexItem from './channels_index_item';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels),
    selected: state.ui.selected.id, 
});

const mapDispatchToProps = dispatch => ({
    getChannels: userId => dispatch(getChannels(userId)),
    selectChannel: id => dispatch(selectChannel(id)),
});

class ChannelsIndex extends React.Component {

    constructor(props) {
        super(props);
        this.selectChannel = this.props.selectChannel;
    }

    componentDidMount() {
        const { currentUser, getChannels } = this.props;
        if (currentUser) {
            getChannels(currentUser.id);
        } else {
            getChannels();
        }
    }

    select(id) {
        return e => {
            this.selectChannel(id);
        }
    }

    render() {
        const { selectChannel, selected } = this.props;
        return (
            <ul>
                {this.props.channels.map(channel => 
                    <ChannelsIndexItem key={channel.id} 
                        channel={channel}
                        select={this.select(channel.id)}
                        className={(channel.id === selected) ? 'selected' : 'unselected'}
                    />)}
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsIndex);