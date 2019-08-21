import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar';
import ChannelContainer from '../channel/channel';
import DmContainer from '../dms/dm';
import SideBar from '../channel/channels_index';
import { Route, Switch } from 'react-router-dom';
import { MemberRoute, PrivateRoute } from '../../util/route_util';
import NewDmFormContainer from '../dms/new_dm_form_container';
import NewChannelFormContainer from '../channel/new_channel_form_container';
import BrowseChannelsContainer from '../channel/browse_channels';
import { getChannel, getChannels } from '../../actions/channel_actions';
import { updateUserChannels } from '../../actions/session_actions';

const mapStateToProps = state => {
    return {
        currentUser: state.entities.users[state.session.id],
        channels: Object.values(state.entities.channels),
        dms: Object.values(state.entities.dms),
    }
};

const mapDispatchToProps = dispatch => ({
    getChannel: channelId => dispatch(getChannel(channelId)),
    getChannels: () => dispatch(getChannels()),
    updateUserChannels: (channelId, userId) => dispatch(updateUserChannels(channelId, userId)),
});

class Homepage extends React.Component {

    componentDidMount() {
        const { updateUserChannels, getChannel } = this.props;
        debugger
        App.notifChannel = App.cable.subscriptions.create(
            { channel: 'NotifChannel' },
            {
                received: data => {
                    switch (data.type) {
                        case 'channel':
                            /* update channels/users/etc*/
                            debugger
                            getChannel(data.channelId).then(() => updateUserChannels(data.channelId, data.userId));
                            debugger
                            break;
                        case 'dm':

                            break;
                    }
                },
                notify: function (data) { return this.perform('notify', data) },
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
