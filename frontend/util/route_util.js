import React from 'react';
import { connect } from 'react-redux';
import {
    withRouter,
    Redirect,
    Route
} from 'react-router';


// render component if not logged in, e.g. /login, /signup
const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={(props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
                <Redirect to="/" />
            )
    )} />
);

const mapStateToProps = state => {
    return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));