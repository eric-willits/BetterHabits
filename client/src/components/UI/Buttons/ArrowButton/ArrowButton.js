import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux';

import styles from './ArrowButton.module.css';

class ArrowButton extends Component {
    render() {
        const rightArrow = <button className={styles.arrowButton} onClick={this.props.onClick}>&rarr;</button>;
        const leftArrow = <button className={styles.arrowButton} onClick={this.props.onClick}>&larr;</button>;

        return (
            <Aux>
                {this.props.direction==="right" ? rightArrow : leftArrow}
            </Aux>
        )
    }
}

export default ArrowButton;