import React from 'react';

class Message extends React.Component {
    render() {
        const { message, bottom } = this.props;
        const time = (new Date(message.created_at)).toLocaleTimeString();
        debugger
        return (
            <li>
                <p><strong>{message.author_id}</strong></p>
                <p>{time}</p>
                <p>{message.body}</p>
                <div ref={bottom} />
            </li>
        );
    };
}

export default Message;