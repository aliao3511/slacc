import React from 'react';
import { connect } from 'react-redux';
import EditMessageForm from './edit_message_form';

const mapStateToProps = (state, ownProps) => ({
    user: state.entities.users[ownProps.message.author_id],
    currentUser: state.entities.users[state.session.id],
});

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = { edit: false, selected: false, visible: false };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    toggleEdit() {
        this.setState({ edit: !(this.state.edit), visible: false});
    }

    onFocus() {
        this.setState({ visible: true });
    }

    onBlur() {
        this.setState({ visible: false });
    }

    render() {
        const { message, user, currentUser } = this.props;
        const { visible } = this.state;
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
            const allowed = currentUser.id == user.id ? true : false;
            // const allowed = currentUser.id == user.id ? 'allowed' : 'not-allowed';
            return (
                <li className={`edit-${this.state.edit}`}>
                    {this.state.edit ? <EditMessageForm dm={message} avatar={avatar} exit={this.toggleEdit}/> : 
                        <>
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
                            <div className="message-settings" tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur}>  
                                <div className={`message-dropdown-content-${visible}`}>
                                    <div className={`message-dropdown-buttons`} onClick={this.toggleEdit}>
                                    {/* <div className={`message-dropdown-buttons`} onClick={this.edit}> */}
                                    {/* <div className={`message-dropdown-buttons ${allowed}`} onClick={this.select(message.id)}> */}
                                        {allowed && <p className="edit">Edit message</p>}
                                    </div>
                                </div>
                            </div>
                        </>}
                </li>
            );
        } else {
            return (<></>);
        }
    };
}

export default connect(mapStateToProps)(Message);