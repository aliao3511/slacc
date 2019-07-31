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
                { errors.length > 0 && 
                    <ul className="session-errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                }
                <form>
                    {/* {/* <div className="form-header"> */}
                        <h1>{formType}</h1>
                        {formDescription}
                    {/* </div> */}
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
                            {/* <Link to={`/${otherFormType.split(" ").join("")}`}>
                        
                        </Link> */}
                            {formType === 'log in' &&
                                <>
                                    <button>try demo</button>
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