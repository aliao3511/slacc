import React from 'react';
import { createChannel, receiveChannel, addChannel } from '../../actions/channel_actions';
import { updateUserChannels, clearErrors, getAllMembers } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ChannelInvites from './channel_invites';

const mapStateToProps = state => {
    return {
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.channel,
    users: Object.values(state.entities.users).filter(user => user.id != state.session.id),
}};

const mapDispatchToProps = dispatch => ({
    createChannel: channel => dispatch(createChannel(channel)),
    updateUserChannels: (channelId, userId) => dispatch(updateUserChannels(channelId, userId)),
    clearErrors: () => dispatch(clearErrors()),
    getAllMembers: () => dispatch(getAllMembers()),
    addChannel: (channelId, userIds) => dispatch(addChannel(channelId, userIds)),
});

class NewChannelForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            purpose: '',
            is_private: false,
            memberIds: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value });
        }
    }

    handleSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        const { createChannel, updateUserChannels, currentUser, clearErrors, addChannel } = this.props;
        clearErrors();
        const channel = Object.assign({}, this.state);
        const { memberIds } = this.state;
        createChannel(channel).then(action => {
            return updateUserChannels(action.channel.id, currentUser.id);
        }).then(action => {
            return addChannel(action.channelId, memberIds);
        }).then(action => {
            this.props.history.push(`/home/channels/${action.channel.id}`);
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

    addMember() {
        return userId => {
            const oldState = this.state.memberIds;
            oldState.push(userId);
            return this.setState({ memberIds: oldState });
        };
    }

    unaddMember() {
        return userId => {
            const oldState = this.state.memberIds;
            const newState = oldState.filter(id => id != userId);
            return this.setState({ memberIds: newState });
        };
    }

    render() {
        const home = this.props.location.state ? this.props.location.state.prevPath : '/home/channels/1';
        const error = this.props.errors.length > 0 ? 'name-error' : 'no-error';
        return (
            <div className="new-channel-form-container" tabIndex="1" onKeyDown={this.handleKeypress}>
                <div className="new-channel-form">
                    <Link to={home} className="escape"></Link>
                    <div className="channel-form-header">
                        <h1>Create a channel</h1>
                        <p>Channels are where your members communicate. They're best when organized around a topic -#marketing, for example.</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="new-channel-inputs">
                            <label className="channel-name">
                                <div className="channel-input-caption">
                                    <strong>Name</strong>
                                    <div className={error}>{this.props.errors[0]}!</div>
                                </div>
                                <input type="text" placeholder="e.g. #marketing" value={this.state.name} onChange={this.handleChange('name')} />
                                <p className="specs">Names cannot be longer than 25 characters.</p>
                            </label>
                            <label className="channel-purpose">
                                <div className="channel-input-caption">
                                    <strong>Purpose</strong>
                                    <p>(optional)</p>
                                </div>
                                <input type="text" value={this.state.purpose} onChange={this.handleChange('purpose')} />
                                <p className="specs">What's this channel about?</p>
                            </label>
                            <div className="channel-input-caption add-members">
                                <strong>Add members</strong>
                                <p>(optional)</p>
                            </div>
                                <ChannelInvites invite={this.addMember()} uninvite={this.unaddMember()} invited={this.state.memberIds}/>
                            {/* <label className="is-private">
                                <strong>Make private</strong>
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label> */}
                        </div>
                        <div className="buttons">
                            <Link to={home} className="cancel">Cancel</Link>
                            <input type="submit" value="Create" className="create"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewChannelForm));