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
        !loggedIn ? (<Component {...props} />) : (<Redirect to="/" />)
    )} />
);

// render component only if logged in
const Protected = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
        )}
    />
);

// render channel only if member, o.w. redirect to preview
const Member = ({ component: Component, path, currentUser, exact }) => {
    return (
        <Route path={path} exact={exact} render={props => {
            return (
                currentUser.channel_ids.includes(parseInt(props.match.params.channelId)) ?
                    <Component {...props} /> : <Redirect to={`/preview/${props.match.params.channelId}`}/>
            )
        }}/>
    );
}

const mapStateToProps = state => {
    debugger
    return { 
        loggedIn: Boolean(state.session.id),
        currentUser: state.entities.users[state.session.id],
    };
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const MemberRoute = withRouter(connect(mapStateToProps)(Member));