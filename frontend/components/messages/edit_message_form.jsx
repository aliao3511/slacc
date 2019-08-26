import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

class EditMessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { body: this.props.dm.body };
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(e) {
        this.setState({ body: e.target.value });
    }

    handleSubmit(e) {
        debugger
        const { dm } = this.props;
        e.preventDefault();
        debugger
        App.currentChannel.edit({ message: this.state.body, dmId: dm.id });
        this.props.exit();
    }

    render() {
        const { avatar, exit } = this.props;
        debugger
        if (App.currentChannel) {
            debugger
            return (
                <div className="edit-message-container">
                    <div className="edit-message">
                        <div className="avatar" style={avatar}></div>
                        <form className="edit-message-form" id="edit-message-form">
                            <textarea
                                value={this.state.body}
                                onChange={this.update}
                                placeholder={this.state.body}
                            />
                        </form>
                    </div>
                    <div className="edit-message-buttons">
                        <button className="cancel" onClick={exit}>Cancel</button>
                        <button className="submit-edit" onClick={this.handleSubmit}>Save Changes</button>
                    </div>
                </div>
            );
        } else {
            debugger
            return <></>;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMessageForm);
