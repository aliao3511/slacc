import React from 'react';
import MessageForm from './message_form';
import MessageContainer from '../messages/message';
import { connect } from 'react-redux';
import { getChannelMessages, receiveMessage } from '../../actions/message_actions';
import { getChannelMembers, updateUserChannels } from '../../actions/session_actions';
import { addChannel } from '../../actions/channel_actions';
import { withRouter } from 'react-router-dom';
import JoinButton from './joinbutton';

const mapStateToProps = (state, ownProps) => ({
    id: state.ui.selected.id,
    // channel: state.entities.channels[state.ui.selected.id],
    channel: state.entities.channels[ownProps.match.params.channelId],
    messages: Object.values(state.entities.messages),
    currentUser: state.entities.users[state.session.id],
})


const mapDispatchToProps = dispatch => ({
    getChannelMembers: channelId => dispatch(getChannelMembers(channelId)),
    getChannelMessages: channelId => dispatch(getChannelMessages(channelId)),
    receiveMessage: message => dispatch(receiveMessage(message)),
    addChannel: channelId => dispatch(addChannel(channelId)),
    updateUserChannels: (channelid, userId) => dispatch(updateUserChannels(channelId, userId)),
});

class Channel extends React.Component {
    
    constructor(props) {
        super(props);
        this.bottom = React.createRef();
        this.getCurrentChannel = this.getCurrentChannel.bind(this);
        this.joinChannel = this.joinChannel.bind(this);
        // this.updateUser = this.updateUser.bind(this);

        this.state = { visible: false };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    getCurrentChannel() {
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.subscriptions = App.cable.subscriptions.subscriptions.slice(1);
        }
        const { receiveMessage, channel } = this.props;
        App.cable.subscriptions.create(
            { channel: 'ChatChannel', id: this.props.match.params.channelId },
            {
                received: data => {
                    switch (data.type) {
                        case 'message':
                            receiveMessage(JSON.parse(data.message));
                            break;
                        case 'messages':
                            // this.setState({ messages: data.messages });
                            break;
                    }
                },
                speak: function (data) { return this.perform('speak', data) },
                load: function () { return this.perform('load') }
            }
        );
    }

    componentDidMount() {
        const { channel, getChannelMembers, getChannelMessages } = this.props;
        const channelId = this.props.match.params.channelId;
        this.getCurrentChannel();
        getChannelMembers(channelId).then(() => getChannelMessages(channelId));
    }

    // loadChat(e) {
    //     e.preventDefault();
    //     // may have to change to key into specific index
    //     App.cable.subscriptions.subscriptions[0].load();
    // }

    componentDidUpdate(prevProps) {
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
        const { channel, getChannelMembers, getChannelMessages } = this.props;
        const channelId = this.props.match.params.channelId;
        debugger
        if (!prevProps.channel || channelId != prevProps.channel.id) {
            debugger
            this.getCurrentChannel();
            getChannelMembers(channelId).then(() => getChannelMessages(channel.id));
        }
    }

    joinChannel(id) {
        const { addChannel } = this.props;
        return e => {
            return addChannel(id).then(() => this.props.history.push(`/home/channels/${id}`));
        }
    }

    // updateUser() {
    //     const { currentUser, updateUserChannels } = this.props;
    //     return e => {
    //         return updateUserChannels(currentUser.id)
    //     };
    // }

    onFocus() {
        debugger
        this.setState({ visible: true });
    }

    onBlur() {
        debugger
        this.setState({ visible: false });
    }

    render() {
        const { messages, channel } = this.props;
        const messageList = messages.map(message => 
            <MessageContainer key={message.id}
                    message={message}
                    />
        );
        const visible = this.state.visible ? 'visible' : '';
        if (channel) {
            return (
                <div className="channel-container">
                    <div className="channel-header">
                        <h1>#{channel.name}</h1>
                        <div className="member-info">
                            <div className="member-icon"></div>
                            <a>{channel.member_ids.length}</a>
                        </div>
                        <div className="settings" tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur}>
                            <div className={`settings-dropdown-content-${visible}`}>
                                <div className="dropdown-buttons">
                                    <p className="leave">Leave #{channel.name}</p>
                                </div>
                            </div>           
                        </div>
                    </div>
                    <div className="message-list">
                        <ul className='messages'>
                            {messageList}
                        </ul>
                    <div ref={this.bottom}></div>
                    </div>
                    <div className='channel-bottom'>
                        {(this.props.location.pathname.includes('/home') && App.cable.subscriptions.subscriptions.length > 0) 
                            && <MessageForm channel={channel}/>}
                        {(this.props.location.pathname.includes('/preview') && App.cable.subscriptions.subscriptions.length > 0) 
                            && <JoinButton channel={channel} 
                                        joinChannel={this.joinChannel(channel.id)}
                                        // updateUser={this.updateUser()}/>}
                                        />}
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channel));