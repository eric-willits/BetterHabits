import React, { Component } from 'react';
//import { connect } from 'react-redux';

import styles from "./WeekGrid.module.css";

class WeekGrid extends Component {
    render() {
        const toShow = [...this.props.data];
        for(let i = this.props.data.length; i <= 7; i++ ){
            toShow.push(false);
        }

        const star = <div className={styles.star}>&#11088;</div>

        const restStyles = [styles.weekContainer, styles.weekContainerBorder].join(" ");

        return (
            <div className={this.props.first ? styles.weekContainer : restStyles}>
                <div className={styles.weekContainerItem}>{toShow[0] ? star : null }</div>
                <div className={[styles.weekContainerItem, styles.weekContainerItemOffset].join(" ")}>{toShow[1] ? star : null }</div>
                <div className={styles.weekContainerItem}>{toShow[2] ? star : null }</div>
                <div className={[styles.weekContainerItem, styles.weekContainerItemOffset].join(" ")}>{toShow[3] ? star : null }</div>
                <div className={styles.weekContainerItem}>{toShow[4] ? star : null }</div>
                <div className={[styles.weekContainerItem, styles.weekContainerItemOffset].join(" ")}>{toShow[5] ? star : null }</div>
                <div className={styles.weekContainerItem}>{toShow[6] ? star : null }</div>
            </div>
        )
    }
}

export default WeekGrid;