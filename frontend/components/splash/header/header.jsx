import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    
    render() {
        const { currentUser, logout } = this.props;
        const display = currentUser ? (
            <>
                <button className="button" onClick={logout}>log out</button>
            </>
        ) : (
            <>
                <Link to="/login" className="sign-in">Sign in</Link>
                <Link to="/signup" className="button">Get Started</Link>
            </>
        );

        return (
            <div className="header-content">
                <div className="left">
                        <Link to="/">
                            <div className="logo">
                                <img src={window.logo_URL} alt="logo" />
                                <p>slacc</p>
                            </div>
                        </Link>
                </div>
                <div className="header-buttons">
                    {display}       
                </div>
            </div>
        );
    }
}

export default Header;