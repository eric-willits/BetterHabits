import * as actionTypes from "./actionTypes";
import axios from 'axios';

import { tokenConfig } from './auth';
import { returnErrors } from './error';


export const getGroups = () => (dispatch, getState) => {
    axios
        .get("/api/groups", tokenConfig(getState))
        .then(res => dispatch({
                type: actionTypes.GET_GROUPS,
                groups: res.data,
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addGroup = groupName => (dispatch, getState) => {
    dispatch(startAction());
    axios
        .post("/api/groups", {name: groupName}, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.ADD_GROUP_SUCCESS,
            group: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "ADD_GROUP_FAIL"));
            dispatch({
                type: actionTypes.ADD_GROUP_FAIL
            })
        });
    
}

export const addHabitToGroup = data => (dispatch, getState) => {
    dispatch(startAction());
    axios
        .put("/api/groups/" + data.groupId, {name: data.name}, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.ADD_HABIT_TO_GROUP_SUCCESS,
            group: res.data,
            name: data.name
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "ADD_HABIT_TO_GROUP_FAIL"));
            dispatch({
                type: actionTypes.ADD_HABIT_TO_GROUP_FAIL
            })
        });
}

export const removeHabitFromGroup = data => (dispatch, getState) => {
    axios
        .put("/api/groups/" + data.groupId + "/delete", {habitId: data.habitId}, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.REMOVE_HABIT_FROM_GROUP,
            group: res.data,
            removedHabit: data.habitId //edit curr week habit data in "habits" reducer
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateHabits = (data, today) => (dispatch, getState) => {
    dispatch(startAction());
    for (const property in data){
        axios
            .put(`/api/groups/${property}/updatehabit`, { today: today, habitData: data[property] }, tokenConfig(getState))
            .then(res => 
                dispatch({
                    type: actionTypes.UPDATE_HABITS,
                    group: res.data,
                    habitData: data[property]
                }));
    }
    dispatch(finishAction());
}

export const deleteGroup = groupId => (dispatch, getState) => {
    dispatch(startAction());
    axios
        .delete(`/api/groups/${groupId}`, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.DELETE_GROUP,
            groupId: res.data.groupId
        }));
}

export const addUser = (username, groupId) => (dispatch, getState) => {
    dispatch(startAction());
    axios
        .put(`/api/groups/adduser`, { username, groupId }, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.ADD_USER,
            group: res.data
        }));
}

export const stepDay = () => {
    return {
        type: actionTypes.STEP_DAY
    }
}

const startAction = () => {
    return {
        type: actionTypes.START_ACTION
    }
}

const finishAction = () => {
    return {
        type: actionTypes.FINISH_ACTION
    }
}