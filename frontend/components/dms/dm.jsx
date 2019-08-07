import React from 'react';
import MessageForm from '../channel/message_form';
import MessageContainer from '../messages/message';
import { connect } from 'react-redux';
import { getDmMessages, receiveMessage } from '../../actions/message_actions';
// import { getUsersById } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    dm: state.entities.dms[ownProps.match.params.dmId],
    messages: Object.values(state.entities.messages),
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
})


const mapDispatchToProps = dispatch => ({
    // getUsersById: userIds => dispatch(getUsersById(userIds)),
    getDmMessages: dmId => dispatch(getDmMessages(dmId)),
    receiveMessage: message => dispatch(receiveMessage(message)),
    // addChannel: (channelId, userIds) => dispatch(addChannel(channelId, userIds)),
    // updateUserChannels: (channelid, userId) => dispatch(updateUserChannels(channelId, userId)),
    // leaveChannel: channelId => dispatch(leaveChannel(channelId)),
});

class Dm extends React.Component {

    constructor(props) {
        super(props);
        this.bottom = React.createRef();
        this.getCurrentDM = this.getCurrentDM.bind(this);
        // this.joinChannel = this.joinChannel.bind(this);
        // this.state = { visible: false };
        // this.onFocus = this.onFocus.bind(this);
        // this.onBlur = this.onBlur.bind(this);
    }

    getCurrentDM() {
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.subscriptions = App.cable.subscriptions.subscriptions.slice(1);
        }
        const { receiveMessage, dm } = this.props;
        App.cable.subscriptions.create(
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
        const { dm, getUsersById, getDmMessages, users, currentUser } = this.props;
        const dmId = this.props.match.params.dmId;
        debugger
        this.getCurrentDM();
        getDmMessages(dmId);
    }

//     // loadChat(e) {
//     //     e.preventDefault();
//     //     // may have to change to key into specific index
//     //     App.cable.subscriptions.subscriptions[0].load();
//     // }

//     componentDidUpdate(prevProps) {
//         if (this.bottom.current) {
//             this.bottom.current.scrollIntoView();
//         }
//         const { channel, getChannelMembers, getChannelMessages } = this.props;
//         const channelId = this.props.match.params.channelId;
//         if (!prevProps.channel || channelId != prevProps.channel.id) {
//             this.getCurrentChannel();
//             getChannelMembers(channelId).then(() => getChannelMessages(channel.id));
//         }
//     }

//     joinChannel(channelId) {
//         const { addChannel, currentUser } = this.props;
//         return e => {
//             return addChannel(channelId, [currentUser.id]);
//         }
//     }

//     leaveChannel(id) {
//         if (id === 1 || this.props.location.pathname.includes('preview')) {
//             return;
//         }
//         const { leaveChannel } = this.props;
//         return e => {
//             return leaveChannel(id)
//                 .then(() => this.setState({ visible: false }))
//                 .then(() => this.props.history.push('/home/channels/1'));
//         };
//     }

//     onFocus() {
//         this.setState({ visible: true });
//     }

//     onBlur() {
//         this.setState({ visible: false });
//     }

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
            const recipients = dm.member_ids.filter(id => id != currentUser.id).map(id => users[id] ? users[id].username : '')
            // const visible = this.state.visible ? 'visible' : '';
            // const general = (dm.id == 1 || this.props.location.pathname.includes('preview')) ? 'general' : '';
                return (
                    <div className="channel-container">
                        <div className="channel-header">
                            <h1>{recipients}</h1>
                            <div className="member-info">
                                {recipients.length > 1 && <div className="member-icon"></div>}
                                <a>{recipients.length > 1 ? recipients.length + 1 : ''}</a>
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
                                && <MessageForm dm={dm} />}
                            {/* {(this.props.location.pathname.includes('/preview') && App.cable.subscriptions.subscriptions.length > 0)
                                && <JoinButton channel={channel}
                                    joinChannel={this.joinChannel(channel.id)} />} */}
                        </div>
                    </div>
                );
            } else {
                return <></>;
            }
        // return <h1>I'M SICK</h1>;
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dm));
// export default Dm;