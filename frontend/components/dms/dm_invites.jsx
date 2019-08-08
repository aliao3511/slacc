import React from 'react';
import { connect } from 'react-redux';
import { getAllMembers } from '../../actions/session_actions';
import { getDms } from '../../actions/dm_actions';
import DmInviteItem from './dm_invite_item';
import Invited from '../channel/invited';

const mapStateToProps = state => {
    const otherUsers = {};
    const otherUserKeys = Object.keys(state.entities.users).forEach(id => {
        if (id != state.session.id) {
            otherUsers[id] = state.entities.users[id];
        }
    });
    return {
        currentUser: state.entities.users[state.session.id],
        users: otherUsers,
        dms: Object.values(state.entities.dms),
    }
};

const mapDispatchToProps = dispatch => ({
    getAllMembers: () => dispatch(getAllMembers()),
    getDms: userId => dispatch(getDms(userId)),
})

class DmInvites extends React.Component {

    constructor(props) {
        super(props);
        // debugger
        this.state = { filtered: [], searchTerm: '', recent: [] };
        this.handleChange = this.handleChange.bind(this);
        this.getUsernames = this.getUsernames.bind(this);
    }

    componentDidMount() {
        // debugger
        const { currentUser, getDms, getAllMembers } = this.props;
        getDms(currentUser.id)
        .then(() => {
            return this.setState({ recent: this.props.dms })
        })
        .then(() => getAllMembers())
        .then(() => this.setState({ filtered: this.props.users }))
    }

    // componentWillReceiveProps(nextProps) {
    //     // debugger
    //     // this.setState({ filtered: Object.values(nextProps.users), });
    // }

    handleChange(e) {
        const currentList = Object.values(this.props.users);
        const searchTerm = e.target.value;
        // debugger
        let newList = [];
        if (searchTerm !== '') {
            newList = currentList.filter(user => {
                if (this.props.invited.includes(user.id)) {
                    return false;
                } else {
                    return user.username.includes(searchTerm.toUpperCase()) || user.username.includes(searchTerm.toLowerCase());
                }
            });
        } else {
            newList = Object.values(this.props.users);
        }
        // debugger
        this.setState({ filtered: newList, searchTerm: searchTerm });
    }
    
    invite(userId) {
        const { invite, dms } = this.props;
        invite(userId);
        // const recentDms = this.state.recent;
        // recentDms.forEach(dm => {
        //     if (dm.member_ids.includes(userId)) {
        //         this.setState({ searchTerm: '', recent:  });
        //     } else {

        //     }
        // })
        this.setState({ searchTerm: '', recent: dms });
    }

    uninvite(userId) {
        const { uninvite, dms } = this.props;
        uninvite(userId);
        this.setState({ searchTerm: '', recent: dms });
    }

    select(dm) {
        const { currentUser, invited } = this.props;
        const { recent } = this.state;
        return e => {
            dm.member_ids.forEach(id => {
                if (id != currentUser.id && !invited.includes(id)) {
                    this.invite(id);
                }
            });
            this.setState({ recent: recent.filter(DM => DM.id != dm.id)});
        };
    }

    getUsernames(dm) {
        const { currentUser, users, invited } = this.props;
        const usernames = [];
        // debugger
        dm.member_ids.forEach(id => {
            if (id != currentUser.id && !invited.includes(id)) {
                usernames.push(users[id].username);
            }
        });
        return usernames.join(', ');
    }

    render() {
        const { currentUser, users } = this.props;
        const results = this.state.filtered.length > 0 ? this.state.filtered.map(user => {
            if (!this.props.invited.includes(user.id)) {
                return <DmInviteItem key={user.id} username={user.username} avatar={user.avatar_url} handleClick={this.invite.bind(this, user.id)} />
            }
        }) : <div className="no-results">No one found matching <strong>{this.state.searchTerm}</strong></div>

        const recent = Object.keys(this.props.users).length > 0 ? this.state.recent.map(dm => {
            const avatar = dm.member_ids.length > 2 ? avatar3_url : users[dm.member_ids[0]].avatar_url;
            if (!dm.member_ids.some(id => this.props.invited.includes(id))) {
                return <DmInviteItem key={dm.id} username={this.getUsernames(dm)} avatar={avatar} handleClick={this.select(dm)}/>
            }
        }) : <></>;

        const invited = this.props.invited.length > 0 ? this.props.invited.map(userId =>
            <Invited key={userId} user={this.props.users[userId]} handleClick={this.uninvite.bind(this, userId)} />
        ) : '';

        return (
            <>
                <div className="dm-form-inputs">
                    <div className="channel-invites dm-invites">
                        <ul className="channel-invites-container">
                            {invited}
                            <input type="text" className="hidden" value={this.state.searchTerm} placeholder="Search by name" onChange={this.handleChange} />
                        </ul>
                    </div>
                    <div className="buttons dm-buttons">
                        <input type="submit" value="Go" className="create" />
                    </div>
                </div>
                {this.state.searchTerm == '' ? (
                    <div className="channels-list">
                        {recent.length > 0 && <p className="subscribed-channels-label">Recent conversations</p>}
                        <ul className="subscribed-channels">
                            {recent}
                        </ul>
                    </div>
                ) : (
                    <div className="channels-list">
                        <ul className="subscribed-channels">
                            {results}
                        </ul>
                    </div>
                )}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DmInvites);