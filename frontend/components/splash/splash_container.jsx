import React from 'react';
import SignupFormContainer from '../session/signup_form_container';
import { Link } from 'react-router-dom';

class SplashContainer extends React.Component {

    render() {
        return (
            <div className="splash-main">
                <h1>Where Work Happens</h1>
                <p>stop, collaborate, and listen</p>
                <Link to='/signup' 
                      component={SignupFormContainer} 
                      className="button">
                    Try For Free
                </Link>
            </div>
        )
    }
   
}

export default SplashContainer;