import React from 'react';
import MessageForm from './message_form';

class Channel extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.bottom = React.createRef();
    }

    componentDidMount() {
        App.cable.subscriptions.create(
            { channel: 'ChatChannel' },
            {
                received: data => {
                    // replace with dispatching action to update redux store
                    // may put in own component
                    this.setState({
                        messages: this.state.messages.concat(data.message)
                    });
                },
                speak: function(data) {
                    return this.perform('speak', data);
                }
            }
        );
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
                <div className="message-list">{messageList}</div>
                <MessageForm />
            </div>
        );
    }

}

export default Channel;