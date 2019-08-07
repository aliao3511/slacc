import React from 'react';

const DmsIndexItem = props => {
    const { currentUser, users, dm, select, className } = props;
    const recipients = dm.member_ids.filter(id => id != currentUser.id).map(id => users[id] ? users[id].username : '')
    return (
        <li onClick={select} className={className}>
            <div className="channel-info">
                {recipients}
            </div>
        </li>
    )
}

export default DmsIndexItem;