import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

class EditMessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { body: '' };
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(e) {
        this.setState({ body: e.target.value });
    }

    handleSubmit(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            App.currentChannel.edit({ message: this.state.body });
            this.setState({ body: '' });
        }
    }

    render() {
        return (
            <div>
                <form>
                    <textarea
                        value={this.state.body}
                        onChange={this.update}
                        onKeyDown={this.handleSubmit}
                    />
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMessageForm);
