import React, { Component } from 'react';

import WeekGrid from '../../../WeekGrid/WeekGrid';
import UserIcon from '../../../../images/user-icon.jpg';

import styles from './UserData.module.css';

class UserData extends Component {
    getData = (data) => {
        if(!data.length){
            return [false, false, false, false, false, false, false];
        } else {
            let habitData = data.filter(entry => entry.day >= this.props.mondayVal && entry.day < this.props.mondayVal+7);
            if(!habitData.length) {
                return [false, false, false, false, false, false, false];
            } else {
                let gap = habitData[0].day-this.props.mondayVal;
                for(let i = 0; i < gap; i++){
                    habitData.unshift({value: false});
                }
                return habitData.map(entry => entry.value);
            }
        }
    }

    
    render() {
        return (
            <div className={styles.tableRow}>
                <div className={styles.tableCell1}>
                    <div className={styles.container}>
                        <img src={UserIcon} alt="user icon" width="45" height="30"/>
                        <p>{this.props.userData.username}</p>
                    </div>
                </div>
                <div className={styles.tableCell2}>
                    <WeekGrid data={this.getData(this.props.userData.data)} first={true}/>
                </div>
            </div>
        )
    }
}


export default UserData;