import * as actionTypes from "../actions/actionTypes";
import { calculateDays } from '../../functions';

const initialState = {
    groups: [],
    today: calculateDays().today,
    dayOfWeek: calculateDays().dayOfWeek,
    loading: true
}

const reducer = (state = initialState, action) => {
    let updatedGroups = null;
    switch(action.type){
        case (actionTypes.START_ACTION) :
            return {
                ...state,
                loading: true
            }
        case (actionTypes.GET_GROUPS) :
            return {
                ...state,
                groups: action.groups,
                loading: false 
                
            }
        case (actionTypes.ADD_GROUP_SUCCESS) :
            return {
                ...state,
                groups: state.groups.concat(action.group),
                loading: false 
            }
        case (actionTypes.ADD_GROUP_FAIL) :
            return {
                ...state,
                loading: false 
            }
        case (actionTypes.ADD_HABIT_TO_GROUP_SUCCESS) :
            updatedGroups = state.groups.filter(group => group._id !== action.group._id);
            updatedGroups.push(action.group);
            return {
                ...state,
                groups: updatedGroups,
                loading: false,
            }
        case (actionTypes.ADD_HABIT_TO_GROUP_FAIL) :
            return {
                ...state,
                loading: false 
            }
        case (actionTypes.REMOVE_HABIT_FROM_GROUP) :
            const newGroups = state.groups.filter(group => group._id !== action.group._id);
            newGroups.push(action.group);
            return {
                ...state,
                groups: newGroups
            }
        case (actionTypes.UPDATE_HABITS) :
            updatedGroups = state.groups.filter(group => group._id !== action.group._id);
            updatedGroups.push(action.group);
            return {
                ...state,
                groups: updatedGroups,
            }
        case (actionTypes.DELETE_GROUP) :
            updatedGroups = state.groups.filter(group => group._id !== action.groupId);
            return {
                ...state,
                groups: updatedGroups,
                loading: false
            }
        case (actionTypes.ADD_USER) :
            updatedGroups = state.groups.filter(group => group._id !== action.group._id);
            updatedGroups.push(action.group);
            return {
                ...state,
                groups: updatedGroups,
                loading: false
            }
        case (actionTypes.STEP_DAY) :
            return {
                ...state,
                today: state.today + 1,
                dayOfWeek: state.dayOfWeek + 1
            }
        case (actionTypes.FINISH_ACTION) :
            return {
                ...state,
                loading: false
            }
        default : return state ;
    }
}

export default reducer;
