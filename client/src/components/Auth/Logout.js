import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions';

class Logout extends Component {  
    render(){
        return(
            <NavLink onClick={this.props.logout} to="/">
                Logout
            </NavLink>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
    }
}

export default connect(null, mapDispatchToProps)(Logout);