import React from 'react';
import MessageForm from './message_form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    debugger
    return {
        id: state.ui.selected.id,
    }
};

// const mapDispatchToProps = dispatch => ({

// });

class Channel extends React.Component {
    
    constructor(props) {
        debugger
        super(props);
        this.state = { messages: [] };
        this.bottom = React.createRef();
        this.getCurrentChannel = this.getCurrentChannel.bind(this);
    }

    getCurrentChannel() {
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.subscriptions = App.cable.subscriptions.subscriptions.slice(1);
        }
        App.cable.subscriptions.create(
            { channel: 'ChatChannel', id: this.props.id },
            {
                received: data => {
                    switch (data.type) {
                        case 'message':
                            this.setState({
                                messages: this.state.messages.concat(data.message)
                            });
                            break;
                        case 'messages':
                            this.setState({ messages: data.messages });
                            break;
                    }
                },
                speak: function (data) { return this.perform('speak', data) },
                load: function () { return this.perform('load') }
            }
        );
    }

    componentDidMount() {
        this.getCurrentChannel();
    }

    // loadChat(e) {
    //     e.preventDefault();
    //     // may have to change to key into specific index
    //     App.cable.subscriptions.subscriptions[0].load();
    // }

    componentDidUpdate(prevProps) {
        // if (this.bottom.current) {
        //     this.bottom.current.scrollIntoView();
        // }
        if (this.props.id !== prevProps.id) {
            this.getCurrentChannel();
        }
    }

    render() {
        debugger
        const messageList = this.state.messages.map(message => {
            // console.log(message.id) 
            // message.id undefined
            return (
                <li key={message.id}>
                    {message}
                    <div ref={this.bottom} />
                </li>
            );
        });
        return (
            <div className="channel-container">
                <div>CHANNEL</div>
                {/* <button className="load-button"
                    onClick={this.loadChat.bind(this)}>
                    Load Chat History
                </button> */}
                <div className="message-list">{messageList}</div>
                <MessageForm />
            </div>
        );
    }

}

// export default Channel;
export default connect(mapStateToProps)(Channel);