import React from 'react';

const ChannelsIndexItem = props => {
    const { channel, select, className } = props;
    return (
        <li onClick={select} className={className}>
            <div className="channel-info">
                # {channel.name}
            </div>
        </li>
    )
}

export default ChannelsIndexItem;