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

const deleteItemSucces = (res) => {
    return {
        type: actionTypes.DELETE_ITEM_SUCCESS,
        message: res.message,
        error: false
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

export const deleteItem = (id,auth) => {
    return dispatch => {
        axios.delete(`/post/item/${id}`, {headers: {"Authorization": `Auth ${auth}`}})
        .then(res => {
            dispatch(deleteItemSucces(res.data));
        })
        .catch(err  => {
            //dispatch(setItemsFail(err.response));
            debugger;
        })
    }
}