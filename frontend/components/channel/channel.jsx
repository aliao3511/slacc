import React from 'react';
import MessageForm from './message_form';
import MessageContainer from '../messages/message';
import { connect } from 'react-redux';
import { getChannelMessages, receiveMessage } from '../../actions/message_actions';
import { getChannelMembers } from '../../actions/session_actions';

const mapStateToProps = state => ({
    id: state.ui.selected.id,
    channel: state.entities.channels[state.ui.selected.id],
    messages: Object.values(state.entities.messages),
})


const mapDispatchToProps = dispatch => ({
    getChannelMembers: channelId => dispatch(getChannelMembers(channelId)),
    getChannelMessages: channelId => dispatch(getChannelMessages(channelId)),
    receiveMessage: message => dispatch(receiveMessage(message)),
});

class Channel extends React.Component {
    
    constructor(props) {
        super(props);
        this.bottom = React.createRef();
        this.getCurrentChannel = this.getCurrentChannel.bind(this);
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
        debugger
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

    render() {
        const { messages, channel } = this.props;
        const messageList = messages.map(message => 
            <MessageContainer key={message.id}
                    message={message}
                    />
        );
        return (
            <div className="channel-container">
                <div className="channel-header">
                    <h1>#{channel.name}</h1>
                    <div className="members"></div>
                    <a>{channel.member_ids.length}</a>
                </div>
                <div className="message-list">
                    <ul className='messages'>
                        {/* {messageList} */}
                    </ul>
                <div ref={this.bottom}></div>
                </div>
                <div className='channel-bottom'>
                    {App.cable.subscriptions.subscriptions.length > 0 && <MessageForm />}
                </div>
            </div>
        );
    }

}

// export default Channel;
export default connect(mapStateToProps, mapDispatchToProps)(Channel);