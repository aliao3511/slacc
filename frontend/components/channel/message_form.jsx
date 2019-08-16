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
        const { channel, dm, recipients } = this.props;
        const placeholder = channel ? `Message #${channel.name}` : `Message ${recipients}`
        return (
            <div className="channel-bottom">
                <div className='message-form'>
                    <form>
                        <textarea
                            value={this.state.body}
                            onChange={this.update('body')}
                            placeholder={placeholder}
                            onKeyDown={this.handleSubmit.bind(this)}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default MessageForm;