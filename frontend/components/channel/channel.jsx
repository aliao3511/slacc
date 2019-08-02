import React from 'react';
import MessageForm from './message_form';

class Channel extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.bottom = React.createRef();
    }

    componentDidMount() {
        // const messageReceived = data => {
        //     this.setState({
        //         messages: this.state.messages.concat(data.message)
        //     });
        // };

        debugger
        App.cable.subscriptions.create(
            { channel: "ChatChannel", id: 1 },
            // { channel: "ChatChannel" },
            {
                received: data => {
                    debugger
                    switch (data.type) {
                        case "message":
                            this.setState({
                                // need to change to only get this channels specific messages
                                // on componentDidMount, fill this.state.messages with this specific channel's messages
                                messages: this.state.messages.concat(data.message)
                            });
                            // messageReceived(data);
                            break;
                        case "messages":
                            this.setState({ messages: data.messages });
                            break;
                    }
                },
                speak: function (data) { return this.perform("speak", data) },
                load: function () { return this.perform("load") }
            }
        );
    }

    loadChat(e) {
        e.preventDefault();
        debugger
        App.cable.subscriptions.subscriptions[0].load();
    }

    componentDidUpdate() {
        this.bottom.current.scrollIntoView();
    }

    render() {
        const messageList = this.state.messages.map(message => {
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

export default Channel;