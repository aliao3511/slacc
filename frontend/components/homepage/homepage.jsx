import React from 'react';
import Sidebar from '../sidebar';
import ChannelContainer from '../channel/channel';
import DmContainer from '../dms/dm';
import SideBar from '../channel/channels_index';
import { Route, Switch } from 'react-router-dom';
import { MemberRoute } from '../../util/route_util';

class Homepage extends React.Component {

    render() {
        return (
            <div className="home-container no-scroll">
                <Sidebar />
                <Switch>
                    {/* <Route path='/home/channels/:channelId' component={ChannelContainer}/> */}
                    <MemberRoute path='/home/channels/:channelId' component={ChannelContainer}/>
                    <Route path='/preview/:channelId' component={ChannelContainer}/>
                    <Route path='/home/dms/:dmId' component={DmContainer}/>
                </Switch>
            </div>
        );
    }
}

export default Homepage;