import React from 'react';
import MessageForm from './message_form';
import { connect } from 'react-redux';
import { getChannelMessages, receiveMessage } from '../../actions/message_actions';

const mapStateToProps = state => ({
    id: state.ui.selected.id,
    messages: Object.values(state.entities.messages),
})


const mapDispatchToProps = dispatch => ({
    getChannelMessages: channelId => dispatch(getChannelMessages(channelId)),
    receiveMessage: message => dispatch(receiveMessage(message))
});

class Channel extends React.Component {
    
    constructor(props) {
        debugger
        super(props);
        // this.state = { messages: [] };
        this.bottom = React.createRef();
        this.getCurrentChannel = this.getCurrentChannel.bind(this);
    }

    getCurrentChannel() {
        debugger
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.subscriptions = App.cable.subscriptions.subscriptions.slice(1);
        }
        const { receiveMessage } = this.props;
        App.cable.subscriptions.create(
            { channel: 'ChatChannel', id: this.props.id },
            {
                received: data => {
                    debugger
                    switch (data.type) {
                        case 'message':
                            receiveMessage(JSON.parse(data.message));
                            // this.setState({
                            //     messages: this.state.messages.concat(data.message)
                            // });
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
        const { id, getChannelMessages } = this.props;
        debugger
        this.getCurrentChannel();
        getChannelMessages(id);
    }

    // loadChat(e) {
    //     e.preventDefault();
    //     // may have to change to key into specific index
    //     App.cable.subscriptions.subscriptions[0].load();
    // }

    componentDidUpdate(prevProps) {
        // if (this.bottom.current) {
        //     this.bottom.current.scrollIntoView();
        // }
        const { id, getChannelMessages } = this.props;
        if (id !== prevProps.id) {
            this.getCurrentChannel();
            getChannelMessages(id);
        }
    }

    render() {
        // const messageList = this.state.messages.map(message => {
        //     // console.log(message.id) 
        //     // message.id undefined
        //     return (
        //         <li key={message.id}>
        //             {message}
        //             <div ref={this.bottom} />
        //         </li>
        //     );
        // });
        const { messages } = this.props;
        const messageList = messages.map(message => {
            return (
                <li key={message.id}>
                    {message.body}
                    <div ref={this.bottom} />
                </li>
            );
        });
        debugger
        return (
            <div className="channel-container">
                <div>CHANNEL</div>
                {/* <button className="load-button"
                    onClick={this.loadChat.bind(this)}>
                    Load Chat History
                </button> */}
                <div className="message-list">{messageList}</div>
                {App.cable.subscriptions.subscriptions.length > 0 && <MessageForm />}
            </div>
        );
    }

}

// export default Channel;
export default connect(mapStateToProps, mapDispatchToProps)(Channel);