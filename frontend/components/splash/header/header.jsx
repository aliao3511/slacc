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
<<<<<<< HEAD
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
=======
            <>
                <Link to="/login">Sign in</Link>
                <Link to="/signup" className="button">Get Started</Link>
            </>
        );

>>>>>>> user_auth
        return (
            <div className="header-content">
                <div className="left">
                        <Link to="/">
                            <div className="logo">
                                <img src={'assets/logo.png'} alt="logo" />
                                <p>slacc</p>
                            </div>
                        </Link>
                    <div className="credits">
                        <a href="https://github.com/aliao3511"/>
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