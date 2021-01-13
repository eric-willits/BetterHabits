import React, { Component } from 'react';
import styles from "./WeekGridHeader.module.css";

class WeekGridHeader extends Component {

    dayToString = day => {
        if(day > 334){
            return (`12/${day-334}`);
        } else if (day > 304){
            return (`11/${day-304}`);
        } else if (day > 273) {
            return (`10/${day-273}`);
        } else if (day > 243) {
            return (`9/${day-243}`);
        } else if (day > 212) {
            return (`8/${day-212}`);
        } else if (day > 181){
            return (`7/${day-181}`);
        } else if (day > 151) {
            return (`6/${day-151}`);
        } else if (day > 120) {
            return (`5/${day-120}`);
        } else if (day > 90) {
            return (`4/${day-90}`);
        } else if (day > 59){
            return (`3/${day-59}`);
        } else if (day > 31) {
            return (`2/${day-31}`);
        } else {
            return (`1/${day}`);
        }
    }

    setDays = monday => {
        let updatedDays = [];
        for(let i = monday; i < monday+7; i++){
            updatedDays.push(this.dayToString(i));
        }
        return updatedDays;
    }

    render(){
        return (
            <div className={styles.weekHeaderContainer}>
                <div className={styles.weekContainerItem}>M <p>{this.setDays(this.props.mondayVal)[0]}</p></div>
                <div className={styles.weekContainerItem}>T <p>{this.setDays(this.props.mondayVal)[1]}</p></div>
                <div className={styles.weekContainerItem}>W <p>{this.setDays(this.props.mondayVal)[2]}</p></div>
                <div className={styles.weekContainerItem}>Th <p>{this.setDays(this.props.mondayVal)[3]}</p></div>
                <div className={styles.weekContainerItem}>F <p>{this.setDays(this.props.mondayVal)[4]}</p></div>
                <div className={styles.weekContainerItem}>Sa <p>{this.setDays(this.props.mondayVal)[5]}</p></div>
                <div className={styles.weekContainerItem}>Su <p>{this.setDays(this.props.mondayVal)[6]}</p></div>
            </div>
        )
    }
}

export default WeekGridHeader;