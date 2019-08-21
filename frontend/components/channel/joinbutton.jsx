import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserChannels } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    owner: state.entities.users[ownProps.channel.owner_id],
});

const mapDispatchToProps = dispatch => ({
    updateUserChannels: (channelId, userId) => dispatch(updateUserChannels(channelId, userId)),
    // updateUserChannels: (channelId, userIds) => dispatch(updateUserChannels(channelId, userIds)),
});

class JoinButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { updateUserChannels, channel, currentUser } = this.props;
        this.props.joinChannel()
        .then(() => this.props.updateUserChannels(channel.id, currentUser.id))
        // .then(() => this.props.updateUserChannels(channel.id, [currentUser.id]))
        .then(() => this.props.history.push(`/home/channels/${channel.id}`));
    }

    render() {
        const { channel, owner } = this.props;
        const time = (new Date(channel.created_at)).toLocaleDateString([],{ year: 'numeric', month: 'long', day: 'numeric'});
        if (owner) {
            return (
                <div className="channel-bottom-preview">
                    <div className="preview-footer">
                        <div className="preview-info">
                            <p>You are viewing <strong>#{channel.name}</strong></p>
                            <p>Created by {owner.username} on {time}</p>
                            <button className="join" onClick={this.handleClick}>Join Channel</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinButton));