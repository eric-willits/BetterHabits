import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';

import GroupData from './GroupData/GroupData';

import styles from './Community.module.css';
 
class Community extends Component {
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.table}>
                    <div className={styles.groupTabs}>
                        <div className={styles.groupTabsTable}>
                            {this.props.groups.map(group => {
                                return (
                                    <div className={styles.groupTabsRow}>
                                        <div className={styles.groupTabsCell}>
                                            <NavLink to={`/community/${group.name}`} activeClassName={styles.active}>{group.name}</NavLink>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.groupData}>
                        <Route path={`/community/:groupName`} component={GroupData} />
                    </div>
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

export default connect(mapStateToProps)(Community);