import * as actionTypes from './actionTypes';
import axios from '../../axios.exchange';

const setItems = (res) => {
    return {
        type: actionTypes.SET_ITEMS,
        items: res.items,
        totalItems: res.totalItems,
        message: res.message
    }
} 

const setItemsFail = (res) => {
    return {
        type: actionTypes.FETCH_ITEMS_FAILED,
        message: res.data.message,
        error: res.data
    }    
}

export const getItems = () => {
    return dispatch => {
        axios.get('/post/items')
        .then(res => {
            dispatch(setItems(res.data));
        })
        .catch(err  => {
            dispatch(setItemsFail(err.response));
        })
    }
}

export const getItemsUser = (auth,userId) => {
    debugger;
    return dispatch => {
        axios.get(`/post/items/${userId}`, {headers: {"Authorization": `Auth ${auth}`}})
        .then(res => {
            dispatch(setItems(res.data));
        })
        .catch(err  => {
            dispatch(setItemsFail(err.response));
        })
    }
}