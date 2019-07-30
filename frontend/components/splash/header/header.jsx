import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../../app/assets/images/logo.png';

class Header extends React.Component {
    render() {
        const { currentUser, logout } = this.props;
        console.log(currentUser);
        const display = currentUser ? (
            <>
                <h2>welcome, {currentUser.username}</h2>
                <button onClick={logout}>log out</button>
            </>
        ) : (
                <>
                    <div className="left">
                        <div className="logo">
                            {/* <img src={'assets/logo.png'} alt="logo" /> */}
                            <img src={window.logoURL} alt="logo" />
                            <p>slacc</p>
                        </div>
                        <div className="credits">
                            <a href="https://github.com/aliao3511">
                                {/* <img src={'assets/github_logo.png'} alt="github"/> */}
                                <img src={window.githubURL} alt="github"/>
                            </a>
                        </div>
                    </div>
                    <div className="header-buttons">
                        <Link to="/login">Sign in</Link>
                        <Link to="/signup" className="button">Get Started</Link>
                    </div>
                </>
            );
        return (
            <div className="header-content">
                {display}
            </div>
        );
    }
}

export default Header;