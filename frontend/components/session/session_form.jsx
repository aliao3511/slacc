import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'you@examplecom',
            password: 'password',
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
            <>
                { errors.length > 0 && 
                    <ul className="session-errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <form>
                    {/* {/* <div className="form-header"> */}
                        <h1>{formType}</h1>
                        <p>
                            Enter your <strong>email address</strong> and <strong>password</strong>
                        </p>
                    {/* </div> */}
                    <div className="form-inputs">
                        <input type="text" value={this.state.email} onChange={this.handleChange('email')}></input>
                        <br />
                        <input type="password" value={this.state.password} onChange={this.handleChange("password")}></input>
                        { formType === 'sign up' && 
                            <>
                                <br />
                                <input type="text" value={this.state.username} onChange={this.handleChange('username')}></input>
                            </>
                        }
                    </div>
                    <div className="form-submit">
                        <button onClick={this.handleSubmit}>{formType}</button>
                        <Link to={`/${otherFormType.split(" ").join("")}`}>
                            {/* {otherFormType.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")} */}
                            {/* {otherFormType} */}
                        </Link>
                    </div>
                </form>
                <Link to={`/${otherFormType.split(" ").join("")}`}>or {otherFormType}</Link>
            </>
        );
    }
}

export default SessionForm;