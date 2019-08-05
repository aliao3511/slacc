import React from 'react';
import MessageForm from './message_form';
import MessageContainer from '../messages/message';
import { connect } from 'react-redux';
import { getChannelMessages, receiveMessage } from '../../actions/message_actions';
import { getChannelMembers, updateCurrentUser } from '../../actions/session_actions';
import { addChannel } from '../../actions/channel_actions';
import { withRouter } from 'react-router-dom';
import JoinButton from './joinbutton';

const mapStateToProps = state => ({
    id: state.ui.selected.id,
    channel: state.entities.channels[state.ui.selected.id],
    messages: Object.values(state.entities.messages),
    currentUser: state.entities.users[state.session.id],
})


const mapDispatchToProps = dispatch => ({
    getChannelMembers: channelId => dispatch(getChannelMembers(channelId)),
    getChannelMessages: channelId => dispatch(getChannelMessages(channelId)),
    receiveMessage: message => dispatch(receiveMessage(message)),
    addChannel: channelId => dispatch(addChannel(channelId)),
    updateCurrentUser: id => dispatch(updateCurrentUser(id)),
});

class Channel extends React.Component {
    
    constructor(props) {
        super(props);
        this.bottom = React.createRef();
        this.getCurrentChannel = this.getCurrentChannel.bind(this);
        this.joinChannel = this.joinChannel.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    getCurrentChannel() {
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.subscriptions = App.cable.subscriptions.subscriptions.slice(1);
        }
        const { receiveMessage } = this.props;
        App.cable.subscriptions.create(
            { channel: 'ChatChannel', id: this.props.id },
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
        const { id, getChannelMembers, getChannelMessages } = this.props;
        this.getCurrentChannel();
        getChannelMembers(id).then(() => getChannelMessages(id));
    }

    // loadChat(e) {
    //     e.preventDefault();
    //     // may have to change to key into specific index
    //     App.cable.subscriptions.subscriptions[0].load();
    // }

    componentDidUpdate(prevProps) {
        this.bottom.current.scrollIntoView();
        const { id, getChannelMembers, getChannelMessages } = this.props;
        if (id !== prevProps.id) {
            this.getCurrentChannel();
            getChannelMembers(id).then(() => getChannelMessages(id));
        }
    }

    joinChannel(id) {
        const { addChannel } = this.props;
        return e => {
            return addChannel(id);
        }
    }

    updateUser() {
        const { currentUser, updateCurrentUser } = this.props;
        return e => {
            return updateCurrentUser(currentUser.id);
        };
    }

    render() {
        const { messages, channel, updateCurrentUser } = this.props;
        const messageList = messages.map(message => 
            <MessageContainer key={message.id}
                    message={message}
                    />
        );
        debugger
        return (
            <div className="channel-container">
                <div className="channel-header">
                    <h1>#{channel.name}</h1>
                    <div className="member-info">
                        <div className="member-icon"></div>
                        <a>{channel.member_ids.length}</a>
                    </div>
                </div>
                <div className="message-list">
                    <ul className='messages'>
                        {messageList}
                    </ul>
                <div ref={this.bottom}></div>
                </div>
                <div className='channel-bottom'>
                    {(this.props.location.pathname === '/home' && App.cable.subscriptions.subscriptions.length > 0) 
                        && <MessageForm />}
                    {(this.props.location.pathname === '/preview' && App.cable.subscriptions.subscriptions.length > 0) 
                        && <JoinButton channel={channel} 
                                    joinChannel={this.joinChannel(channel.id)}
                                    updateUser={this.updateUser()}/>}
                </div>
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channel));