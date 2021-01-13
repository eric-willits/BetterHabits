import React, { Component } from 'react';

import styles from './NavItems.module.css';

class NavItems extends Component{
    render(){
        return(
            <div className={styles.NavItems}>
                {this.props.children}
            </div>
        )
    }
}

export default NavItems;