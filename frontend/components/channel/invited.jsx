import React from 'react';

class Invited extends React.Component {

    render() {
        const { user, handleClick } = this.props;
        const image_url = user.avatar_url.includes("avatar_1") ? avatar1_url : avatar2_url;
        const avatar = {
            backgroundImage: `url(${image_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '30px',
            height: '30px',
            // marginLeft: '25px',
            marginRight: '5px',
        }
        return (
            <li className="invited-item">
                <div className="invited-item-content" onClick={handleClick}>
                    <div className="avatar" style={avatar}></div>
                    <strong>{user.username}</strong>
                    <div className="x"></div>
                </div>
            </li>
        );
    }

}

export default Invited;