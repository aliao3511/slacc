import React from 'react';
import HeaderContainer from './splash/header/header_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import SplashContainer from './splash/splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util'; 
import { Route, Switch } from 'react-router-dom';
import HomepageContainer from './homepage/homepage_container';
import NewChannelFormContainer from './channel/new_channel_form_container';
import BrowseChannelsContainer from './channel/browse_channels';
import NewDmFormContainer from './dms/new_dm_form_container';

const App = () => {
    return (<>
        <header>
            <Route exact path={['/', '/login', '/signup']} component={HeaderContainer}/>
        </header>
        
        <AuthRoute exact path='/login' component={LoginFormContainer}/>
        <AuthRoute exact path='/signup' component={SignupFormContainer}/>
        <Route exact path='/' component={SplashContainer}/>
        
        <ProtectedRoute path={['/home', '/preview']} component={HomepageContainer}/>
        <ProtectedRoute exact path='/create-channel' component={NewChannelFormContainer}/>
        <ProtectedRoute exact path='/add-channel' component={BrowseChannelsContainer}/>
        <ProtectedRoute exact path='/create-dm' component={NewDmFormContainer}/>


        <Route exact path={['/', '/login', '/signup']} render={() => 
            <footer>
                <a className="credits" href="https://github.com/aliao3511" />
            </footer>
        } />
        
    </>)
};

export default App;