import React from 'react';

const DmInviteItem = props => {
        const { username, avatar, handleClick } = props;
        let image_url;
        if (typeof avatar === 'string') {
            image_url = avatar.includes("avatar_1") ? avatar1_url : avatar2_url;
        } else {
            image_url = avatar;
        }
        const avatarStyle = {
            backgroundImage: `url(${image_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '40px',
            height: '40px',
            marginLeft: '0px',
            marginRight: '10px',
        }
        return (
            <li onClick={handleClick}>
                <div className="channel-item">
                    <div className="dm-item-content">
                        <div className="avatar" style={avatarStyle}></div>
                        <strong>{username}</strong>
                    </div>
                </div>
            </li>
        );
};

export default DmInviteItem;