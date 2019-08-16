import React from 'react';
import Sidebar from '../sidebar';
import ChannelContainer from '../channel/channel';
import DmContainer from '../dms/dm';
import SideBar from '../channel/channels_index';
import { Route, Switch } from 'react-router-dom';
import { MemberRoute, PrivateRoute } from '../../util/route_util';
import NewDmFormContainer from '../dms/new_dm_form_container';
import NewChannelFormContainer from '../channel/new_channel_form_container';
import BrowseChannelsContainer from '../channel/browse_channels';

class Homepage extends React.Component {

    componentDidMount() {
        debugger
        App.notifChannel = App.cable.subscriptions.create(
            { channel: 'NotifChannel' },
            {
                received: data => {
                    switch (data.type) {
                        case 'addMembers':
                            /* update channels/users/etc*/
                            break;
                    }
                },
                add_members: function (data) { return this.perform('add_members', data) },
            }
        );

    }

    componentWillUnmount() {
        App.notifChannel.unsubscribe();
    }

    render() {
        return (
            <div className="home-container no-scroll">
                <Route path={['/home/channels/:channelId', '/preview/:channelId', '/home/dms/:dmId']} component={Sidebar} />
                <Switch>
                    <Route path='/home/create-dm' component={NewDmFormContainer} />
                    <Route exact path='/home/add-channel' component={BrowseChannelsContainer} />
                    <Route exact path='/home/create-channel' component={NewChannelFormContainer} />
                    <MemberRoute path='/home/channels/:channelId' component={ChannelContainer}/>
                    <Route path='/preview/:channelId' component={ChannelContainer}/>
                    <PrivateRoute path='/home/dms/:dmId' component={DmContainer}/>
                </Switch>
            </div>
        )
    }
}

export default Homepage;