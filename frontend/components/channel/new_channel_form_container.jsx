import React from 'react';
import { createChannel } from '../../actions/channel_actions';
import { updateCurrentUser } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
    createChannel: channel => dispatch(createChannel(channel)),
    updateCurrentUser: id => dispatch(updateCurrentUser(id)),
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
        const { createChannel, updateCurrentUser, currentUser } = this.props;
        const channel = Object.assign({}, this.state);
        this.props.createChannel(channel)
            .then(() => updateCurrentUser(currentUser.id))
            .then(() => this.props.history.push('/home'));
    }

    render() {
        return (
            <div className="new-channel-form">
                <h1>Create a channel</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="e.g. marketing" value={this.state.name} onChange={this.handleChange('name')}/>
                    <input type="purpose" value={this.state.purpose} onChange={this.handleChange('purpose')}/>
                    <Link to='/home'>Cancel</Link>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannelForm);