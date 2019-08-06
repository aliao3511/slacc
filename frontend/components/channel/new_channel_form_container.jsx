import React from 'react';
import { createChannel, receiveChannel } from '../../actions/channel_actions';
import { updateUserChannels, clearErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    return {
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.channel,
}};

const mapDispatchToProps = dispatch => ({
    createChannel: channel => dispatch(createChannel(channel)),
    updateUserChannels: (channelId, userId) => dispatch(updateUserChannels(channelId, userId)),
    clearErrors: () => dispatch(clearErrors()),
});

class NewChannelForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            purpose: '',
            is_private: false,
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
        const { createChannel, updateUserChannels, currentUser, clearErrors } = this.props;
        clearErrors();
        const channel = Object.assign({}, this.state);
        this.props.createChannel(channel).then(action => {
            return updateUserChannels(action.channel.id, currentUser.id);
        }).then(action => {
            this.props.history.push(`/home/channels/${action.channelId}`);
        });
    }

    handleKeypress(e) {
        if (e.keyCode === 27) {
            if (this.props.location.state.prevPath) {
                this.props.history.push(this.props.location.state.prevPath);
            } else {
                this.props.history.push('/home/channels/1');
            }
        }
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
                                    <div className={error}>Don't forget to name your channel!</div>
                                </div>
                                <input type="text" placeholder="e.g. #marketing" value={this.state.name} onChange={this.handleChange('name')} />
                            </label>
                            <label className="channel-purpose">
                                <div className="channel-input-caption">
                                    <strong>Purpose</strong>
                                    <p>(optional)</p>
                                </div>
                                <input type="purpose" value={this.state.purpose} onChange={this.handleChange('purpose')} />
                            </label>
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