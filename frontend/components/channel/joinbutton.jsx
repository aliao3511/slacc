import React from 'react';
import { withRouter } from 'react-router-dom';

class JoinButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.joinChannel()
        .then(() => this.props.updateUser())
        .then(() => this.props.history.push('/home'));
    }

    render() {
        const { channel } = this.props;
        return (
            <div className="preview-footer">
                <p>You are now viewing <strong>{channel.name}</strong></p>
                <button onClick={this.handleClick}>Join</button>
            </div>
        );
    }
}

export default withRouter(JoinButton);