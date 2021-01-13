import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import RegisterModal from '../Auth/RegisterModal';
import Logout from '../Auth/Logout';
import LoginModal from '../Auth/LoginModal';
import Aux from '../../hoc/Aux';
import NavItems from './NavItems/NavItems';
import NavItem from './NavItems/NavItem/NavItem';

import styles from './AppNavbar.module.css';


class AppNavbar extends Component {
    state = {
        isOpen: false
    }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const guestLinks = (
            <Aux>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Aux>
        );

        const authLinks = (
            <Aux>
                <NavItem>
                    <a>
                        {this.props.auth.user ? <strong>Welcome {this.props.auth.user.username}</strong> : null}
                    </a>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Aux>
        );

        return (
            <div className={styles.AppNavbar}>
                <NavLink to="#" className={styles.AppLogoItem}>betterhabits</NavLink>
                <NavItems>
                    <NavItem>
                        <NavLink to="#">
                            Github
                        </NavLink>
                    </NavItem>
                    {this.props.auth.isAuthenticated ? authLinks : guestLinks}
                </NavItems>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AppNavbar);