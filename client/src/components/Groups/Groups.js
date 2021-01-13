import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Button, Spinner } from 'reactstrap';
import WeekGrid from '../WeekGrid/WeekGrid';
import WeekGridHeader from '../WeekGrid/WeekGridHeader/WeekGridHeader';
import AddGroupModal from './AddGroupModal/AddGroupModal';
import AddHabitModal from './AddHabitModal/AddHabitModal';
import ArrowButton from '../UI/Buttons/ArrowButton/ArrowButton';
import DeleteHabitButton from '../UI/Buttons/DeleteHabitButton/DeleteHabitButton';

import { calculateMonday } from '../../functions';
import styles from './Groups.module.css';


class Groups extends Component {
    state = {
        monday: null
    }
    
    onClick = shiftMonday => {
        this.setState({ monday: shiftMonday });
    }

    getData = (data) => {
        if(!data.length){
            return [false, false, false, false, false, false, false];
        } else {
            let habitData = data.filter(entry => entry.day >= this.state.monday && entry.day < this.state.monday+7);
            if(!habitData.length) {
                return [false, false, false, false, false, false, false];
            } else {
                let gap = habitData[0].day-this.state.monday;
                for(let i = 0; i < gap; i++){
                    habitData.unshift({value: false});
                }
                return habitData.map(entry => entry.value);
            }
        }
    }

    componentDidMount(){
        this.setState({ monday: calculateMonday()});
        this.props.getGroups();
    }
    
    render() {
        let table = null;
        if(this.props.loading){
            table = <Spinner color="secondary"/>
        }
        if(!this.props.loading){
            let habitCounter = -1;
            table = (
                <div className={styles.table}>
                    <div className={styles.tableRow}>
                        <div className={styles.shifter}>
                            <AddGroupModal />
                        </div>
                        <div className={styles.tableCell}>
                            <div className={styles.table}>
                                <div className={styles.tableRow}>
                                    <div className={styles.shifter}>
                                        <ArrowButton
                                            direction="left"
                                            onClick={() => this.onClick(this.state.monday-7)}
                                        />
                                        <ArrowButton
                                            direction="right"
                                            onClick={() => this.onClick(this.state.monday+7)}
                                        />
                                    </div>
                                    <div className={styles.tableCell}>
                                        <WeekGridHeader mondayVal={this.state.monday}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.groups.map((group, index) => {
                        return (
                            <div className={styles.tableRow}>
                                <div className={index%2===0 ? [styles.groupTab, styles.even].join(" ") : [styles.groupTab, styles.odd].join(" ")}>
                                    <AddHabitModal 
                                            style={{cursor: "pointer"}}
                                            name={group.name}
                                            groupId={group._id}
                                        />
                                </div>
                                <div className={styles.tableCell}>
                                    <div className={styles.table}>
                                        {group.habits.map(habit =>{
                                            habitCounter += 1;
                                            return (
                                                <div className={styles.tableRow}>
                                                    <div className={habitCounter%2===0 ? [styles.tableCellTab, styles.even2].join(" ") : [styles.tableCellTab, styles.odd2].join(" ")}>
                                                        <div className={styles.table}>
                                                            <div className={styles.tableRow}>
                                                                <div className={styles.shifter}>
                                                                    <DeleteHabitButton onClick={() => { this.props.removeHabitFromGroup({groupId: group._id, habitId: habit._id})}}/>
                                                                </div>
                                                                <div className={styles.tableCell}>
                                                                    {habit.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.tableCell}>
                                                        <WeekGrid data={this.getData(habit.data.find(userData => userData.username === this.props.username).data)} first={habitCounter===0}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }

        return (
            <div className={styles.container}>
                <div className={styles.tableContainer}>
                    {table}
                </div>
                
                <Button
                    color="dark"
                    style={{marginTop: '2rem'}}
                    onClick={this.props.stepDay}
                >Next Day</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        groups: state.group.groups,
        loading: state.group.loading,
        username: state.auth.user.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGroups: () => dispatch(actions.getGroups()),
        removeHabitFromGroup: (data) => dispatch(actions.removeHabitFromGroup(data)),
        stepDay: () => dispatch(actions.stepDay()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);