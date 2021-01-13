import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserData from './UserData/UserData';
import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';
import WeekGridHeader from '../../WeekGrid/WeekGridHeader/WeekGridHeader';
import styles from './HabitData.module.css';
import { calculateMonday } from '../../../functions';

class HabitData extends Component {
    state = {
        monday: null
    }

    componentDidMount(){
        this.setState({ monday: calculateMonday()});
    }

    onClick = shiftMonday => {
        this.setState({ monday: shiftMonday });
    }

    render() {
        const groupName = this.props.match.params.groupName;
        const habitName = this.props.match.params.habitName;

        const foundHabit = this.props.groups.find(group => group.name === groupName)
                        .habits.find(habit => habit.name === habitName);

        return (
            <div className={styles.table}>
                <div className={styles.tableRow}>
                    <div className={[styles.tableCell1, styles.topRow].join(" ")}>
                        <div className={styles.container}>
                            <div>
                                <ArrowButton direction="left" onClick={() => this.onClick(this.state.monday-7)}/>
                                <ArrowButton direction="right" onClick={() => this.onClick(this.state.monday+7)}/>
                            </div>
                        </div>
                    </div>
                    <div className={[styles.tableCell2, styles.topRow].join(" ")}>
                        <WeekGridHeader mondayVal={this.state.monday}/>
                    </div>
                </div>
                {foundHabit.data.map(userData => <UserData userData={userData} mondayVal={this.state.monday}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        groups: state.group.groups,
        monday: state.group.monday
    }
}

export default connect(mapStateToProps)(HabitData);