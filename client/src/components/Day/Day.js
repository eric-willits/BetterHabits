import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Day.module.css';

import * as actions from '../../store/actions';


class Day extends Component {
    state = {};

    componentDidMount() {
        this.props.groups.forEach(group => {
            let habitArray = group.habits.map(habit => {
                return {
                    habitId: habit._id,
                    value: false
                }
            })
            this.setState({ [group._id]: habitArray });
        })
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    onChange = (event, habitId, groupId) => {
        let habitArray = [...this.state[groupId]];
        habitArray.find(habit => habit.habitId === habitId).value = event.target.checked;
        this.setState({ [groupId] : habitArray });
    }
    
    onSubmit = event => {
        event.preventDefault();
        
        this.props.submitForm(this.state, this.props.today);
        this.props.history.push("/groups");
    }

    render() {
        return(
            <div className={styles.container}>
                <form onSubmit={this.onSubmit} className={styles.form}>
                    <p className={styles.title}>today I  : </p>
                    {this.props.groups.map(group => {
                        return (group.habits.map(habit => {
                            return (
                                <div key={habit.name} className={styles.item}>
                                    <label>
                                    <input type="checkbox" onChange={(event) => this.onChange(event, habit._id, group._id)}/> {habit.name}
                                    </label>
                                </div>
                            )
                        }))
                    })}
                    <button className={styles.button}>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        today: state.group.today,
        groups: state.group.groups
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitForm: (data, today) => dispatch(actions.updateHabits(data, today))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);