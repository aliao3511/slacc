import React from 'react';
import MessageForm from '../channel/message_form';
import MessageContainer from '../messages/message';
import { connect } from 'react-redux';
import { getDmMessages, receiveMessage } from '../../actions/message_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    dm: state.entities.dms[ownProps.match.params.dmId],
    messages: Object.values(state.entities.messages),
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
})


const mapDispatchToProps = dispatch => ({
    getDmMessages: dmId => dispatch(getDmMessages(dmId)),
    receiveMessage: message => dispatch(receiveMessage(message)),
});

class Dm extends React.Component {

    constructor(props) {
        super(props);
        this.bottom = React.createRef();
        this.getCurrentDm = this.getCurrentDm.bind(this);
    }

    getCurrentDm() {
       if (App.currentChannel) {
            App.currentChannel.unsubscribe();
            // App.currentChannel = null;
        }
        const { receiveMessage, dm } = this.props;
        App.currentChannel = App.cable.subscriptions.create(
            { channel: 'DmChannel', id: this.props.match.params.dmId },
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
        const { dm, getDmMessages, users, currentUser } = this.props;
        const dmId = this.props.match.params.dmId;
        this.getCurrentDm();
        getDmMessages(dmId);
    }

    componentDidUpdate(prevProps) {
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
        const { dm, getDmMessages, users, currentUser } = this.props;
        const dmId = this.props.match.params.dmId;
        if (!prevProps.dm || dmId != prevProps.dm.id) {
            this.getCurrentDm();
            getDmMessages(dmId);
        }
    }

    render() {
        const { messages, dm, users, currentUser } = this.props;
        if (dm && dm.id == this.props.match.params.dmId) {
            const messageList = messages.map(message => {
                if (message.messageable_id == dm.id) {
                    return <MessageContainer key={message.id}
                        message={message}
                    />;
                } else {
                    return <></>;
                }
            });
            const recipients = dm.member_ids.filter(id => id != currentUser.id).map(id => users[id] ? users[id].username : '').join(', ')
            // const visible = this.state.visible ? 'visible' : '';
            // const general = (dm.id == 1 || this.props.location.pathname.includes('preview')) ? 'general' : '';
                return (
                    <div className="channel-container">
                        <div className="channel-header">
                            <h1>{recipients}</h1>
                            <div className="member-info">
                                {dm.member_ids.length > 2 && <div className="member-icon"></div>}
                                <a>{dm.member_ids.length > 2 ? dm.member_ids.length : ''}</a>
                            </div>
                            {/* <div className="settings" tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur}>
                                <div className={`settings-dropdown-content-${visible}`}>
                                    <div className={`dropdown-buttons settings-dropdown ${general}`} onClick={this.leaveChannel(channel.id)}>
                                        <p className="leave">Leave #{channel.name}</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="message-list">
                            <ul className='messages'>
                                {messageList}
                            </ul>
                            <div ref={this.bottom}></div>
                        </div>
                        <div className='channel-bottom'>
                            {App.cable.subscriptions.subscriptions.length > 0
                                && <MessageForm dm={dm} recipients={recipients}/>}
                        </div>
                    </div>
                );
            } else {
                return <></>;
            }
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dm));