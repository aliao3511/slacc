import React from 'react';
import { getChannels } from '../../actions/channel_actions';
import { getUsersById } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    channels: Object.values(state.entities.channels),
    users: state.entities.users,
});

const mapDispatchToProps = dispatch => ({
    getChannels: () => dispatch(getChannels()),
    getUsersById: userIds => dispatch(getUsersById(userIds)),
});

class BrowseChannels extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filtered: [], subscribed: [] };
        this.handleChange = this.handleChange.bind(this);
        this.select = this.select.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    componentDidMount() {
        const { currentUser, getChannels, getUsersById } = this.props;
        getChannels()
        .then(() => {
            const channels = [];
            const subscribedChannels = [];
            this.props.channels.forEach(channel => {
                if (!currentUser.channel_ids.includes(channel.id)) {
                    channels.push(channel);
                } else {
                    subscribedChannels.push(channel);
                }
            });
            return this.setState({ filtered: channels, subscribed: subscribedChannels })
        })
        .then(() => {
            const ownerIds = [];
            this.props.channels.forEach(channel => ownerIds.push(channel.owner_id));
            getUsersById(ownerIds);
        });
    }

    componentWillReceiveProps(nextProps) {
        const { currentUser } = this.props;
        const channels = [];
        const subscribedChannels = [];
        nextProps.channels.forEach(channel => {
            if (!currentUser.channel_ids.includes(channel.id)) {
                channels.push(channel);
            } else {
                subscribedChannels.push(channel);
            }
        });
        this.setState({ filtered: channels, subscribed: subscribedChannels });
    }

    handleChange(e) {
        const currentList = this.props.channels;
        let newList = [];
        if (e.target.value !== '') {
            newList = currentList.filter(channel => {
                const searchTerm = e.target.value;
                return channel.name.includes(searchTerm.toUpperCase()) || channel.name.includes(searchTerm.toLowerCase());
            });
        } else {
            newList = this.props.channels;
        }
        this.setState({ filtered: newList });
    }

    select(id) {
        const { currentUser, selectChannel } = this.props;
        return e => {
            if (currentUser.channel_ids.includes(id)) {
                this.props.history.push(`/home/channels/${id}`);
            } else {
                this.props.history.push(`/preview/${id}`);
            }
        }
    }

    handleKeypress(e) {
        if (e.keyCode === 27) {
            this.props.history.push("/home/channels/1");
        }
    }
    
    render() {
        debugger
        const { users } = this.props;
        return (
            <div className="add-channel-container" tabIndex="1" onKeyDown={this.handleKeypress}>
                <Link to="/home/channels/1" className="escape"></Link>
                <div className="add-channel">
                    <h1>Browse Channels</h1>
                    <input type="text" placeholder="Search channels" onChange={this.handleChange}/>
                    <div className="channels-list">
                        <ul className="add-channels-index">
                            {this.state.filtered.map(channel => 
                                <li key={channel.id} onClick={this.select(channel.id)}>
                                        <div className="channel-item">
                                            <strong>#{channel.name}</strong>
                                        <p>Created by {users[channel.owner_id] ? users[channel.owner_id].username : ''}</p>
                                        </div>
                                </li>
                            )}
                        </ul>
                        <p className="subscribed-channels-label">Channels you belong to</p>
                        <ul className="subscribed-channels">
                            {this.state.subscribed.map(channel =>
                                <li key={channel.id} onClick={this.select(channel.id)}>
                                    <div className="channel-item">
                                        <strong>#{channel.name}</strong>
                                        <p>Created by {users[channel.owner_id] ? users[channel.owner_id].username : ''}</p>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseChannels)