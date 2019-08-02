import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <div className="header">
                    WORKSPACE
                    CURRENT USER DISPLAY NAME
                </div>
                <div className="channels-index">
                    CHANNELS
                </div>
                <div className="dms-index">
                    DIRECT MESSAGES
                </div>
            </div>
        )
    }
}

export default Sidebar;