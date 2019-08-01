import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {

    componentDidMount() {
        this.props.clearErrors();
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(() => this.props.history.push('/'));
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    demoLogin() {
        this.setState({ email: 'demo@slacc.com', password: 'password' }, this.handleSubmit);
    }

    render() {
        const { formType, errors } = this.props;
        let otherFormType;
        let formDescription;
        if (formType === 'sign up') {
            otherFormType = 'log in';
            formDescription = (<p>Enter your <strong>email address</strong>, <strong>password</strong>, and <strong>display name</strong></p>);
        } else {
            otherFormType = 'sign up';
            formDescription = (<p>Enter your <strong>email address</strong> and <strong>password</strong></p>);
        }
        return (
            <div className="form-main">
                <form>
                    {errors.length > 0 &&
                        <ul className="session-errors">
                            {errors.map((error, idx) => <li key={idx}>
                                <div className="error-icon"></div>
                                <p>{error}</p>
                            </li>)}
                        </ul>
                    }
                    <h1>{formType}</h1>
                    {formDescription}
                    <div className="form-content">
                        <div className="form-inputs">
                            <input type="text" placeholder="you@example.com" value={this.state.email} onChange={this.handleChange('email')}></input>
                            <input type="password" placeholder="password" value={this.state.password} onChange={this.handleChange("password")}></input>
                            { formType === 'sign up' && 
                                <>
                                    <input type="text" placeholder="your name" value={this.state.username} onChange={this.handleChange('username')}></input>
                                </>
                            }
                        </div>
                        <div className="form-submit">
                            <button onClick={this.handleSubmit}>{formType}</button>
                            {formType === 'log in' &&
                                <>
                                    <button onClick={this.demoLogin}>try demo</button>
                                </>
                            }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;