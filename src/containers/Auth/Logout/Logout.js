import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount() {        
        this.props.logout();
    }

    render() {
        return (
            <div>
                <Redirect to="auth"/>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
       logout: (data, isSignup) => dispatch(actions.logout(data, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);