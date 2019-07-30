import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.clearErrors();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(() => this.props.history.push("/"));
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    render() {
        const { formType, errors } = this.props;
        let otherFormType = formType === 'sign up' ? 'log in' : 'sign up';
        return (
            <div className="session-form">
                <h2>{formType}</h2>
                { errors.length > 0 && 
                    <ul className="session-errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <form>
                    <label>
                        Email:
                        <input type="text" value={this.state.email} onChange={this.handleChange('email')}></input>
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.handleChange("password")}></input>
                    </label>
                    { formType === 'sign up' && 
                        <>
                            <br />
                            <label>
                                Display Name:
                            <input type="text" value={this.state.username} onChange={this.handleChange('username')}></input>
                            </label>
                        </>
                    }
                    <button onClick={this.handleSubmit}>{formType}</button>
                </form>
                <Link to={`/${otherFormType.split(" ").join("")}`}>or {otherFormType}</Link>
            </div>
        );
    }
}

export default SessionForm;