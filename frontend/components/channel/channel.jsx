import React from 'react';
import MessageForm from './message_form';
import MessageContainer from '../messages/message';
import { connect } from 'react-redux';
import { getChannelMessages, receiveMessage } from '../../actions/message_actions';
import { getChannelMembers, updateCurrentUser } from '../../actions/session_actions';
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
        // const { receiveMessage } = this.props;
        debugger
        const { receiveMessage, channel } = this.props;
        App.cable.subscriptions.create(
            // { channel: 'ChatChannel', id: this.props.id },
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
        // const { id, getChannelMembers, getChannelMessages } = this.props;
        const { channel, getChannelMembers, getChannelMessages } = this.props;
        this.getCurrentChannel();
        // getChannelMembers(id).then(() => getChannelMessages(id));
        getChannelMembers(channel.id).then(() => getChannelMessages(channel.id));
    }

    // loadChat(e) {
    //     e.preventDefault();
    //     // may have to change to key into specific index
    //     App.cable.subscriptions.subscriptions[0].load();
    // }

    componentDidUpdate(prevProps) {
        this.bottom.current.scrollIntoView();
        // const { id, getChannelMembers, getChannelMessages } = this.props;
        const { channel, getChannelMembers, getChannelMessages } = this.props;
        // if (id !== prevProps.id) {
        if (channel.id !== prevProps.channel.id) {
            this.getCurrentChannel();
            // getChannelMembers(id).then(() => getChannelMessages(id));
            getChannelMembers(channel.id).then(() => getChannelMessages(channel.id));
        }
    }

    joinChannel(id) {
        const { addChannel } = this.props;
        return e => {
            return addChannel(id).then(() => this.props.history.push(`/home/${id}`));
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
        if (channel) {
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
                        {(this.props.location.pathname.includes('/home') && App.cable.subscriptions.subscriptions.length > 0) 
                            && <MessageForm />}
                        {(this.props.location.pathname === `/preview/${channel.id}` && App.cable.subscriptions.subscriptions.length > 0) 
                            && <JoinButton channel={channel} 
                                        joinChannel={this.joinChannel(channel.id)}
                                        updateUser={this.updateUser()}/>}
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Channel));