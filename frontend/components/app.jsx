import React from 'react';
import HeaderContainer from './splash/header/header_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import SplashContainer from './splash/splash_container';
import { AuthRoute } from '../util/route_util'; 
import { Route } from 'react-router-dom';

const App = () => (
    <>
        <header>
            <HeaderContainer />
        </header>
        <Route exact path='/' component={SplashContainer}/>
        <AuthRoute exact path='/login' component={LoginFormContainer} />
        <AuthRoute exact path='/signup' component={SignupFormContainer} />
        <footer>
            <p>This web app is a clone of Slack</p>
        </footer>
    </>
);

export default App;