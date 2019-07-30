import React from 'react';
import HeaderContainer from './header/header_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { AuthRoute } from '../util/route_util'; 

const App = () => (
    <div>
        <header>
            <HeaderContainer />
        </header>
        <AuthRoute path='/login' component={LoginFormContainer} />
        <AuthRoute path='/signup' component={SignupFormContainer} />
    </div>
);

export default App;