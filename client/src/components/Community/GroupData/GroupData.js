import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';

import HabitData from '../HabitData/HabitData';

import styles from './GroupData.module.css';

class GroupData extends Component {
    render(){
        const groupName = this.props.match.params.groupName;
        const foundGroup = this.props.groups.find(group => group.name === groupName);

        return (
            <div className={styles.table}>
                <div className={styles.habitTabsRow}>
                    {foundGroup
                        .habits.map(habit => {
                            return (
                                <div className={styles.habitTabCell}>
                                    <div className={styles.habitTab}>
                                        <NavLink to={`/community/${groupName}/${habit.name}`} activeClassName={styles.active}>{habit.name}</NavLink>
                                    </div>
                                </div>
                            )
                    })}
                </div>
                <div className={styles.habitDataRow}>
                    <td colSpan={`${foundGroup.habits.length}`}>
                        <Route path={`/community/:groupName/:habitName`} component={HabitData} />
                    </td>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        groups: state.group.groups
    }
}

export default connect(mapStateToProps)(GroupData);