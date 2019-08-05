import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
        owner: state.entities.users[ownProps.channel.owner_id],
});

class JoinButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { updateUser, channel } = this.props;
        this.props.joinChannel()
        .then(() => this.props.updateUser())
    }

    render() {
        const { channel, owner } = this.props;
        const time = (new Date(channel.created_at)).toLocaleDateString([],{ year: 'numeric', month: 'long', day: 'numeric'});
        if (owner) {
            return (
                <div className="preview-footer">
                    <div className="preview-info">
                        <p>You are viewing <strong>#{channel.name}</strong></p>
                        <p>Created by {owner.username} on {time}</p>
                        <button className="join" onClick={this.handleClick}>Join Channel</button>
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    }
}

export default withRouter(connect(mapStateToProps)(JoinButton));