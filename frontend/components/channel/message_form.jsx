import React from "react";

class MessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { body: '' };

    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value });
        }
    }

    handleSubmit(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body });
            this.setState({ body: '' });
        }
    }

    render() {
        const { channel } = this.props;
        return (
            <div className='message-form'>
                <form>
                    <textarea
                        value={this.state.body}
                        onChange={this.update('body')}
                        placeholder={`Message #${channel.name}`}
                        onKeyDown={this.handleSubmit.bind(this)}
                    />
                </form>
            </div>
        );
    }
}

export default MessageForm;