import React from 'react';
import { connect } from 'react-redux';
import EditMessageForm from './edit_message_form';

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.message.author_id],
});

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = { edit: false, selected: null };
        this.edit = this.edit.bind(this);
    }

    select(messageId) {
        return e => {
            this.setState( { selected: messageId });
        };
    }

    edit() {
        this.setState({ edit: true });
    }

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
                        {/* {this.state.edit ? <EditMessageForm dm={selected}/> : } */}
                        {/* insert edit message button here (dropdown or?) */}
                    </div>
                    <div className="edit">
                        
                    </div>
                </li>
            );
        } else {
            return (<></>);
        }
    };
}

export default connect(mapStateToProps)(Message);