import React from 'react';
import { connect } from 'react-redux';
import { createDm, updateUserDms } from '../../actions/dm_actions';
import DmInvites from './dm_invites';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    dms: Object.values(state.entities.dms),
});

const mapDispatchToProps = dispatch => ({
    createDm: (senderId, recipientId) => dispatch(createDm(senderId, recipientId)),
    updateUserDms: (dmId, userId) => dispatch(updateUserDms(dmId, userId)),
});

class NewDmForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recipientIds: [], senderId: this.props.currentUser.id };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { createDm, updateUserDms, currentUser } = this.props;
        const { senderId, recipientIds } = this.state;
        createDm(senderId, recipientIds).then(action => {
            App.notifChannel.notify({ dmId: action.dm.id, memberIds: recipientIds });
            return updateUserDms(action.dm.id, currentUser.id);
            // return updateUserDms(action.dm.id, [currentUser.id]);
        }).then(action => {
            this.props.history.push(`/home/dms/${action.dmId}`);
        });
    }

    handleKeypress(e) {
        if (e.keyCode === 27) {
            if (this.props.location.state) {
                this.props.history.push(this.props.location.state.prevPath);
            } else {
                this.props.history.push('/home/channels/1');
            }
        }
    }

    addRecipient() {
        return userId => {
            const oldState = this.state.recipientIds;
            oldState.push(userId);
            return this.setState({ recipientIds: oldState });
        };
    }

    unaddRecipient() {
        return userId => {
            const oldState = this.state.recipientIds;
            const newState = oldState.filter(id => id != userId);
            return this.setState({ recipientIds: newState });
        };
    }

    render() {
        const home = this.props.location.state ? this.props.location.state.prevPath : '/home/channels/1';
        return (
            <div className="add-channel-container" tabIndex="1" onKeyDown={this.handleKeypress}>
                <div className="new-channel-form">
                    <Link to={home} className="escape"></Link>
                    <form className="new-dm-form" onSubmit={this.handleSubmit}>
                        <div className="new-channel-inputs new-dm-inputs">
                            <strong className="dm-caption">Direct Messages</strong>
                            <DmInvites invite={this.addRecipient()} uninvite={this.unaddRecipient()} invited={this.state.recipientIds} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDmForm);