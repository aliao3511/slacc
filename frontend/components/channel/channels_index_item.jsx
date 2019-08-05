import React from 'react';

class ChannelsIndexItem extends React.Component {
    render() {
        const { channel, select, className } = this.props;
        debugger
        return (
            <li onClick={select} className={className}>
                <div className="channel-info">
                    {channel.name}
                </div>
            </li>
        )
    }
}

export default ChannelsIndexItem;