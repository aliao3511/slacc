import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
        const errorMessages = errors.length === 0 ? "" : errors.map((error, idx) => <li key={idx}>{error}</li>);
        return (
            <div className="session-form">
                <h2>{formType}</h2>
                <ul className="session-errors">
                    {errorMessages}
                </ul>
                <form>
                    <label>
                        username:
            <input type="text" value={this.state.username} onChange={this.handleChange("username")}></input>
                    </label>
                    <br />
                    <label>
                        password:
            <input type="password" value={this.state.password} onChange={this.handleChange("password")}></input>
                    </label>
                    <button onClick={this.handleSubmit}>{formType}</button>
                </form>
                <Link to={`/${otherFormType.split(" ").join("")}`}>or {otherFormType}</Link>
            </div>
        );
    }
}

export default SessionForm;