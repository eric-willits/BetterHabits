import React, { Component } from 'react';

import styles from './DeleteHabitButton.module.css';

class DeleteHabitButton extends Component {
    render(){
        return (
            <button className={styles.deleteButton} onClick={this.props.onClick}>
                &times;
            </button>
        )
    }
}

export default DeleteHabitButton;