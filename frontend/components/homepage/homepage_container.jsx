import React from 'react';
import { connect } from 'react-redux';
import Homepage from './homepage';
import { getChannels } from '../../actions/channel_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
    getChannels: dispatch => getChannels(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

