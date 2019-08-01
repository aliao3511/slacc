import React from 'react';
import { connect } from 'react-redux';
import { verifyEmail } from '../../actions/session_actions';

const mapDispatchToProps = dispatch => ({
    checkEmail: email => dispatch(verifyEmail(email)),
});

class EmailForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '' };
    }

    handleChange(e) {
        this.setState({ email: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.checkEmail(this.state.email);
    }
    

    render() {
        <form onSubmit={this.handleSubmit}>
            <input type="email" placeholder="you@example.com" value={this.state.email} onChange={this.handleChange} required></input>
            <input className="button" type="submit"/>
        </form>
    }

}

export default connect(null, mapDispatchToProps)(EmailForm);