import React from 'react';
import ChannelsIndexContainer from './channel/channels_index';
import DmsIndexContainer from './dms/dms_index';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus() {
        this.setState({ visible: true });
    }

    onBlur() {
        this.setState({ visible: false });
    }

    logout() {
        const { logout } = this.props;
        return e => {
            logout().then(() => this.props.history.push('/'));
        }
    }

    render() {
        const { currentUser } = this.props;
        if (currentUser) {
            const image_url = currentUser.avatar_url.includes("avatar_1") ? avatar1_url : avatar2_url;
            const avatar = {
                backgroundImage: `url(${image_url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                marginRight: '15px',
            };
            const visible = this.state.visible ? 'visible' : '';
            return (
                <div className="sidebar">
                    <div className="header">
                        <h1>WORKSPACE</h1>
                        <div className="dropdown" tabIndex="0" onFocus={this.onFocus} onBlur={this.onBlur}>
                            <p>{currentUser ? currentUser.username : ''}</p>
                            <div className={`user-dropdown-content-${visible}`}>
                                <div className='dropdown-info'>
                                    <div className="avatar" style={avatar}></div>
                                    <strong>{currentUser.username}</strong>
                                </div>
                                <div className="dropdown-buttons" onClick={this.logout()}>
                                    <p className="logout">Sign out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="channels-index">
                        <ChannelsIndexContainer/>
                    </div>
                    <div className="dms-index">
                        <DmsIndexContainer />
                    </div>
                </div>)
        } else {
            return <></>;
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));