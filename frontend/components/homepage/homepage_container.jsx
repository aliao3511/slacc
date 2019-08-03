import React from 'react';
import { connect } from 'react-redux';
import Homepage from './homepage';
import { getChannels } from '../../actions/channel_actions';

const mapStateToProps = state => {
    return {
    currentUser: state.entities.users[state.session.id],
    selected: state.ui.selected.id,
    }
};

const mapDispatchToProps = dispatch => ({
    getChannels: dispatch => getChannels(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

