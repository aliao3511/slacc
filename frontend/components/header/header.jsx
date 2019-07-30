import React from 'react';
import { Link } from 'react-router-dom';

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
                    <Link to="/login">Sign in</Link>
                    <Link to="/signup">Get Started</Link>
                </>
            );
        return (
            <div className="greeting">
                {display}
            </div>
        );
    }
}

export default Header;