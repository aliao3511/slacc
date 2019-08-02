import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <div class="sidebar">
                <div class="header">
                    WORKSPACE
                    CURRENT USER DISPLAY NAME
                </div>
                <div class="channels-index">
                    CHANNELS
                </div>
                <div class="dms-index">
                    DIRECT MESSAGES
                </div>
            </div>
        )
    }
}

export default Sidebar;