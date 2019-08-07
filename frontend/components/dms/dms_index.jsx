import React from 'react';
import { connect } from 'react-redux';
import { getDms } from '../../actions/dm_actions';
// import { getUsersById } from '../../actions/session_actions';
import DmsIndexItem from './dms_index_item';
import { Link, withRouter } from 'react-router-dom';
import { merge } from 'lodash';

const mapStateToProps = (state, ownProps) => {
    // let subscribedChannels = {};
    // state.entities.users[state.session.id].channel_ids.forEach(id => {
    //     if (state.entities.channels[id]) {
    //         subscribedChannels[id] = state.entities.channels[id];
    //     }
    // });
    // if (ownProps.location.pathname.includes('preview')) {
    //     let previewedChannels = {};
    //     if (state.entities.channels[ownProps.match.params.channelId]) {
    //         previewedChannels = { [ownProps.match.params.channelId]: state.entities.channels[ownProps.match.params.channelId] };
    //     }
    //     subscribedChannels = merge(previewedChannels, subscribedChannels);
    // }
    return {
        currentUser: state.entities.users[state.session.id],
        dms: Object.values(state.entities.dms),
        users: state.entities.users,
    }
};

const mapDispatchToProps = dispatch => ({
    getDms: userId => dispatch(getDms(userId)),
});

class DmsIndex extends React.Component {

    constructor(props) {
        super(props);
        this.bottom = React.createRef();
    }

    componentDidMount() {
        debugger
        this.bottom.current.scrollIntoView();
        const { currentUser, getDms } = this.props;
        getDms(currentUser.id)
    }

    select(id) {
        return e => {
            this.props.history.push(`/home/dms/${id}`);
        }
    }

    componentDidUpdate() {
        this.bottom.current.scrollIntoView();
    }

    render() {
        debugger
        const prevPath = this.props.location.pathname;
        const { currentUser, users } = this.props;
        return (
            <div className="index-container">
                <div className="tooltip">
                    <Link to='/add-dm'>Direct Messages</Link>
                    <span className="tooltip-text open1">Open a direct message</span>
                </div>
                <div className="tooltip">
                    <Link className="create-channel" to={{ pathname: '/add-dm', state: { prevPath: prevPath } }}></Link>
                    <span className="tooltip-text open2">Open a direct message</span>
                </div>
                <ul className="channels-index">
                    {this.props.dms.map(dm =>
                        <DmsIndexItem key={dm.id}
                            currentUser={currentUser}
                            dm={dm}
                            users={users}
                            select={this.select(dm.id)}
                            className={(dm.id == this.props.match.params.dmId) ? 'selected-channel' : 'unselected'}
                        />)}
                    <div ref={this.bottom}></div>
                </ul>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DmsIndex));