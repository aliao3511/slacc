import React from 'react';
import { connect } from 'react-redux';
import { getAllMembers } from '../../actions/session_actions';
import ChannelInviteItem from './channel_invite_item';
import Invited from './invited';

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
    }   
};

const mapDispatchToProps = dispatch => ({
    getAllMembers: () => dispatch(getAllMembers()),
})

class ChannelInvites extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filtered: [], visible: '', searchTerm: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllMembers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ filtered: Object.values(nextProps.users) });
    }

    handleChange(e) {
        const currentList = Object.values(this.props.users);
        const searchTerm = e.target.value;
        let newList = [];
        let visible = '';
        if (e.target.value !== '') {
            newList = currentList.filter(user => {
                if (this.props.invited.includes(user.id)) {
                    return false;
                } else {
                    return user.username.includes(searchTerm.toUpperCase()) || user.username.includes(searchTerm.toLowerCase());
                }
            });
            visible = 'visible';
        } else {
            newList = Object.values(this.props.users);
        }
        this.setState({ filtered: newList, visible: visible, searchTerm: searchTerm });
    }

    invite(userId) {
        this.props.invite(userId)
        this.setState({ searchTerm: '', visible: '' });
    }

    uninvite(userId) {
        this.props.uninvite(userId)
        this.setState({ searchTerm: '', visible: '' });
    }

    render() {
        const users = this.state.filtered.length > 0 ? this.state.filtered.map((user, idx) => {
            if (!this.props.invited.includes(user.id)) {
                return <ChannelInviteItem key={user.id} user={user} idx={idx} handleClick={this.invite.bind(this, user.id)}/>
            }
        }) : <div className="no-results">No one found matching <strong>{this.state.searchTerm}</strong></div>
        
        const invited = this.props.invited.length > 0 ? this.props.invited.map(userId =>
            <Invited key={userId} user={this.props.users[userId]} handleClick={this.uninvite.bind(this, userId)}/>
        ) : '';
        return (
            <div className="channel-invites">
                <ul className="channel-invites-container">
                    {invited}
                    <input type="text" className="hidden" value={this.state.searchTerm} placeholder="Search by name" onChange={this.handleChange} />
                </ul>
                <div className="channel-invites-bottom">
                    <div className={`invites-dropdown-${this.state.visible}`}>
                        <ul className="all-users">
                            {users}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInvites);