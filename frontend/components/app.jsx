import React from 'react';
import HeaderContainer from './splash/header/header_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { AuthRoute } from '../util/route_util'; 
import { Link, Route } from 'react-router-dom';

const App = () => (
    <>
        <header>
            <HeaderContainer />
        </header>
        <Route exact path='/' render={() => (
            <div className="splash-main">
                <h1>Where Work Happens</h1>
                <p>stop, collaborate, and listen</p>
                <Link to='/signup' component={SignupFormContainer} className="button">Try For Free</Link>
                {/* <Route  exact path='/' component={}/>  */}
            </div>
        )}/>
        <Route exact path='/' render={() => (
            <div className="form-main">
            </div>
        )} />
        <AuthRoute path='/login' component={LoginFormContainer} />
        <AuthRoute path='/signup' component={SignupFormContainer} />
    </>
);

export default App;