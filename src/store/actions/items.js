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

export const getItems = (auth) => {
    return dispatch => {
        //Temporary adding headers before I add authentification
        axios.get('/post/items', {headers: {"Authorization": `Auth ${auth}`}})
        .then(res => {
            dispatch(setItems(res.data));
        })
        .catch(err  => {
            dispatch(setItemsFail(err.response));
        })
    }
}