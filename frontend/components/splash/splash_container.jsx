import React from 'react';
import { connect } from 'react-redux';
import SignupFormContainer from '../session/signup_form_container';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

class Splash extends React.Component {

    render() {
        const { currentUser } = this.props;
        console.log(currentUser);
        const splashText = currentUser ? (
            <>
                <div className="splash-byline">
                    <h1>Welcome back, {currentUser.username}</h1>
                </div>
                <Link to='/'
                    className="button">
                    Launch Slacc
                </Link>
            </>
        ) : (
            <>
                <div className="splash-byline">
                    <h1>Where Work Happens</h1>
                    <p>stop, collaborate, and listen</p>
                </div>
                <Link to='/signup'
                    className="button">
                    Try For Free
                </Link>
            </>
        );

        console.log(splashText);
        return (
            <div className="splash-container">
                <div className="splash-text">
                    {splashText}
                </div>
                <div className="splash-animation">
                    <img className="dropbox" src={'assets/dropbox.png'} alt="dropbox"/>
                    <img className="asana" src={'assets/asana.png'} alt="asana"/>
                    <img className="googledrive" src={'assets/googledrive.png'} alt="google"/>
                    <img className="salesforce" src={'assets/salesforce.png'} alt="salesforce"/>
                    <img className="jira" src={'assets/jira.png'} alt="jira"/>
                    <img className="zendesk" src={'assets/zendesk.png'} alt="zendesk"/>
                    <img className="gotomeeting" src={'assets/gotomeeting.png'} alt="gotomeeting"/>
                    <img className="onedrive" src={'assets/onedrive.png'} alt="onedrive"/>
                    <img className="zoom" src={'assets/zoom.png'} alt="zoom"/>
                    <img className="giphy" src={'assets/giphy.png'} alt="giphy"/>
                    <img className="lattice" src={'assets/lattice.png'} alt="lattice"/>
                    <img className="teamline" src={'assets/teamline.png'} alt="teamline"/>
                    <img className="dash" src={'assets/dash.png'} alt="dash"/>
                    <img className="outlook" src={'assets/outlook.png'} alt="outlook"/>
                    <img className="cisco" src={'assets/cisco.png'} alt="cisco"/>
                    <img className="loom" src={'assets/loom.png'} alt="loom"/>
                </div>
            </div>
        )
    }
   
}

// export default SplashContainer;
export default connect(mapStateToProps)(Splash);