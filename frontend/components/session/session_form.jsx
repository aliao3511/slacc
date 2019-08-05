import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {

    componentDidMount() {
        this.props.clearErrors();
    }

    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            password: '',
            username: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }

    handleSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        this.props.clearErrors();
        this.props.clearVerifiedUser();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(() => this.props.history.push('/home/1'));
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value });
        }
    }

    demoLogin(e) {
        e.preventDefault();
        if (this.props.formType === 'sign up') {
            this.props.login({ email: 'demo@slacc.com', password: 'password' }).then(() => this.props.history.push('/home/1'));
        } else {
            this.props.processForm({ email: 'demo@slacc.com', password: 'password' }).then(() => this.props.history.push('/home/1'));
        }
    }

    render() {
        const { formType, errors } = this.props;
        let otherFormType;
        let formDescription;
        let submitText;
        if (formType === 'sign up') {
            otherFormType = 'log in';
            formDescription = (<p>Enter your <strong>email address</strong>, <strong>password</strong>, and <strong>display name</strong></p>);
            submitText = (<p>Don't want to sign up?</p>); 
        } else {
            otherFormType = 'sign up';
            formDescription = (<p>Enter your <strong>email address</strong> and <strong>password</strong></p>);
            submitText = (<p>Don't have an account?</p>)
        }
        return (
            <div className="form-main">
                {errors.length > 0 &&
                    <ul className="session-errors">
                        {errors.map((error, idx) => <li key={idx}>
                            <div className="error-icon"></div>
                            <p>{error}</p>
                        </li>)}
                    </ul>
                }
                <form onSubmit={this.handleSubmit}>
                    {errors.length > 0 &&
                        <ul className="session-errors">
                            {errors.map((error, idx) => <li key={idx}>
                                <div className="error-icon"></div>
                                <p>{error}</p>
                            </li>)}
                        </ul>
                    }
                    <div className="form-header">
                        <h1>{formType}</h1>
                        {formDescription}
                    </div>
                    <div className="form-content">
                        <div className="form-inputs">
                            <input type="email" placeholder="you@example.com" value={this.state.email} onChange={this.handleChange('email')} required></input>
                            <input type="password" placeholder="password" value={this.state.password} onChange={this.handleChange("password")} required></input>
                            { formType === 'sign up' && 
                                <>
                                    <input type="text" placeholder="your name" value={this.state.username} onChange={this.handleChange('username')} required></input>
                                </>
                            }
                        </div>
                        <div className="form-submit">
                            <input className="submit" type="submit" value={formType}></input>
                            <div className="demo-login">
                                {submitText}
                                <button className="demo-login-button" onClick={this.demoLogin}>Try the demo!</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;