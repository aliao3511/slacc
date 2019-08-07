import React from 'react';

class ChannelInviteItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { firstHover: true }
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({ firstHover: true });
    }

    handleMouseLeave() {
        if (this.state.firstHover) {
            this.setState({ firstHover: false });
        }
    }

    render() {
        const { user, idx, handleClick } = this.props;
        const image_url = user.avatar_url.includes("avatar_1") ? avatar1_url : avatar2_url;
        const avatar = {
            backgroundImage: `url(${image_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '25px',
            height: '25px',
            marginLeft: '25px',
            marginRight: '10px',
        }
        const result = (this.state.firstHover && idx == 0) ? 'first-result' : 'result';
        return (
            <li className={result} onMouseLeave={this.handleMouseLeave} onClick={handleClick}>
                <div className="user-item">
                    <div className="user-item-content">
                        <div className="avatar" style={avatar}></div>
                        <strong>{user.username}</strong>
                    </div>
                </div>
            </li>
        )
    }
}

export default ChannelInviteItem;