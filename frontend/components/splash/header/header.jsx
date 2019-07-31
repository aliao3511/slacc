import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../../app/assets/images/logo.png';

class Header extends React.Component {
    render() {
        const { currentUser, logout } = this.props;
        const display = currentUser ? (
            <>
                {/* <h2>welcome, {currentUser.username}</h2> */}
                <button className="button" onClick={logout}>log out</button>
            </>
        ) : (
            <>
                <Link to="/login">Sign in</Link>
                <Link to="/signup" className="button">Get Started</Link>
            </>
        );

        return (
            <div className="header-content">
                <div className="left">
                    <div className="logo">
                        <img src={'assets/logo.png'} alt="logo" />
                        <p>slacc</p>
                    </div>
                    <div className="credits">
                        <a href="https://github.com/aliao3511">
                            <img src={'assets/github_logo.png'} alt="github" />
                        </a>
                    </div>
                </div>
                <div className="header-buttons">
                    {display}       
                </div>
            </div>
        );
    }
}

export default Header;