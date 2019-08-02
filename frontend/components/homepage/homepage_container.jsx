import React from 'react';
import { connect } from 'react-redux';
import Homepage from './homepage';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = action => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

