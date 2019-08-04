import React from 'react';
import { addChannel, selectChannel, getChannels } from '../../actions/channel_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    channels: Object.values(state.entities.channels),
});

const mapDispatchToProps = dispatch => ({
    // addChannel: channelId => dispatch(addChannel(channelId)),
    selectChannel: channelId => dispatch(selectChannel(channelId)),
    getChannels: () => dispatch(getChannels()),
});

class BrowseChannels extends React.Component {

    constructor(props) {
        debugger
        super(props);
        this.state = { filtered: [] }
        this.handleChange = this.handleChange.bind(this);
        this.select = this.select.bind(this);
    }

    componentDidMount() {
        this.props.getChannels().then(() => this.setState({ filtered: this.props.channels }));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ filtered: nextProps.channels });
    }

    handleChange(e) {
        debugger
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

    select(id) {
        const { selectChannel } = this.props;
        return e => {
            selectChannel(id);
        }
    }
    
    render() {
        return (
            <div className="add-channel">
                <h1>Browse Channels</h1>
                <input type="text" placeholder="Search channels" onChange={this.handleChange}/>
                <ul className="add-channels-index">
                    {this.state.filtered.map(channel => 
                        <li key={channel.id} onClick={this.select(channel.id)}>
                            <Link to='/home'>{channel.name}</Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseChannels)