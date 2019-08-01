import React from 'react';
import { connect } from 'react-redux';
import { verifyEmail } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => ({
    checkEmail: email => dispatch(verifyEmail(email)),
});

class EmailForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ email: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.checkEmail(this.state.email).then(({ user }) => {
            if (user.exists) {
                this.props.history.push('/login');
            } else {
                this.props.history.push('/signup');
            }
        });
    }
    
    render() {
        return (
            <form className="email-form" onSubmit={this.handleSubmit}>
                <input className="email" type="email" placeholder="you@example.com" value={this.state.email} onChange={this.handleChange} required></input>
                <input className="button" type="submit" value="Try for free"/>
            </form>
        )
    }

}

export default withRouter(connect(null, mapDispatchToProps)(EmailForm));