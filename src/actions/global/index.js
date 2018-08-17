import { ADD_APP_DATA, ADD_APP_CONTEXT, ADD_HISTORY_DATA } from './actionType';

export const addAppContext = (data) => {
    return {
        type: ADD_APP_CONTEXT,
        data
    }
}

export const addAppData = (data) => {
    return {
        type: ADD_APP_DATA,
        data
    }
}

export const addHistory = (data) => {
    return {
        type: ADD_HISTORY_DATA,
        data
    }
}