import React from 'react';
import { addChannel, selectChannel } from '../../actions/channel_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    channels: Object.values(state.entities.channels),
});

const mapDispatchToProps = dispatch => ({
    // addChannel: channelId => dispatch(addChannel(channelId)),
    selectChannel: channelId => dispatch(selectChannel(channelId)),
});

class BrowseChannels extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filtered: [] }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ filtered: this.props.channels });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ filtered: nextProps.channels });
    }

    handleChange(e) {
        const currentList = this.props.channels;
        let newList = [];
        if (e.target.value !== '') {
            newList = currentList.filter(channel => {
                const searchTerm = e.target.value;
                return channel.name.includes(searchTerm.toUpperCase()) || channel.name.includes(searchTerm.toLowerCase());
            });
        } else {
            newList = this.props.channels;
        }
        this.setState({ filtered: newList });
    }
    
    render() {
        const { channels } = this.props;
        return (
            <div className="add-channel">
                <h1>Browse Channels</h1>
                <input type="text" placeholder="Search channels" onChange={this.handleChange}/>
                <ul className="add-channels-index">
                    {channels.map(channel => <li key={channel.id}>{channel.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseChannels)