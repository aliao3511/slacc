import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.message.author_id],
})

class Message extends React.Component {

    render() {
        const { message, user } = this.props;
        if (user) {
            const image_url = user.avatar_url.includes("avatar_1") ? avatar1_url : avatar2_url;
            const avatar = {
                backgroundImage: `url(${image_url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            };
            let time = (new Date(message.created_at)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (time[0] === "0") {
                time = time.slice(1);
            }
            return (
                <li>
                    <div className="message">
                        <div className="avatar" style={avatar}></div>
                        <div className="message-content">
                            <div className="message-header"> 
                                <p><strong>{user.username}</strong></p>
                                <p className="time">{time}</p>
                            </div>
                            <p>{message.body}</p>
                        </div>
                    </div>
                </li>
            );
        } else {
            return (<></>);
        }
    };
}

export default connect(mapStateToProps)(Message);