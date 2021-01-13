import React, { Component } from 'react';

import styles from './NavItem.module.css';

class NavItem extends Component{
    render(){
        return(
            <div className={styles.NavItem}>
                {this.props.children}
            </div>
        )
    }
}

export default NavItem;