import React, { Component } from 'react';

import styles from './Home.module.css';

class Home extends Component {
    render(){
        return(
            <div className={styles.container}>
                <h1 className={styles.text}>Better habits start here.  Login to begin.</h1>
            </div>
        )
    }
}

export default Home;