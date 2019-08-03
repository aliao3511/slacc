import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
    username: state.entities.users[ownProps.message.author_id] ? state.entities.users[ownProps.message.author_id].username : '',
})

class Message extends React.Component {

    render() {
        const { message, bottom, username } = this.props;
        const time = (new Date(message.created_at)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        debugger
        return (
            <li>
                <div className="message">
                    <p><strong>{username}</strong></p>
                    <p>{time}</p>
                    <p>{message.body}</p>
                    {/* <div ref={bottom} /> */}
                </div>
            </li>
        );
    };
}

export default connect(mapStateToProps)(Message);