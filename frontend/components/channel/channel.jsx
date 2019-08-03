import React from 'react';
import MessageForm from './message_form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    debugger
    return {
        id: state.ui.selected.id,
    }
};

// const mapDispatchToProps = dispatch => ({

// });

class Channel extends React.Component {
    
    constructor(props) {
        debugger
        super(props);
        this.state = { messages: [] };
        this.bottom = React.createRef();
    }

    componentDidMount() {
        debugger
        const { id } = this.props;
        App.cable.subscriptions.create(
            { channel: 'ChatChannel', id: id },
            // { channel: 'ChatChannel', id: this.props.id },
            {
                received: data => {
                    switch (data.type) {
                        case 'message':
                            this.setState({
                                // need to change to only get this channels specific messages // done in chat_channel.rb
                                // on componentDidMount, fill this.state.messages with this specific channel's messages
                                messages: this.state.messages.concat(data.message)
                            });
                            break;
                        case 'messages':
                            this.setState({ messages: data.messages });
                            break;
                    }
                },
                speak: function (data) { return this.perform('speak', data) },
                load: function () { return this.perform('load') }
            }
        );
    }

    loadChat(e) {
        e.preventDefault();
        // may have to change to key into specific index
        App.cable.subscriptions.subscriptions[0].load();
    }

    componentDidUpdate() {
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
    }

    render() {
        debugger
        const messageList = this.state.messages.map(message => {
            // console.log(message.id) 
            // message.id undefined
            return (
                <li key={message.id}>
                    {message}
                    <div ref={this.bottom} />
                </li>
            );
        });
        return (
            <div className="channel-container">
                <div>CHANNEL</div>
                <button className="load-button"
                    onClick={this.loadChat.bind(this)}>
                    Load Chat History
                </button>
                <div className="message-list">{messageList}</div>
                <MessageForm />
            </div>
        );
    }

}

// export default Channel;
export default connect(mapStateToProps)(Channel);