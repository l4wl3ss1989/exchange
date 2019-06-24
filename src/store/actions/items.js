import * as actionTypes from './actionTypes';
import axios from '../../axios.exchange';

const itemStart = () => { return {type: actionTypes.ITEM_START} }

const setItems = (res, page) => {
    return {
        type: actionTypes.SET_ITEMS,
        items: res.items,
        totalItems: res.totalItems,
        itemsPage: page
    }
} 

const setItem = (res) => {
    return {
        type: actionTypes.SET_ITEM,
        item: res.item,
        message: res.message
    }
}

const actionItemFail = (error) => {
    return {
        type: actionTypes.ACTION_ITEM_FAILED,
        message: error.message
    }    
}

const actionItemSucces = (res) => {
    return {
        type: actionTypes.ACTION_ITEM_SUCCESS,
        message: res.message,
    }
}

export const getItems = (page) => {
    return dispatch => {
        axios.get('/post/items?page=' + page)
        .then(res => {
            dispatch(setItems(res.data, page));
        })
        .catch(err  => {
            dispatch(actionItemFail(err.response));
        })
    }
}

export const getItemsUser = (auth,userId,page) => {
    return dispatch => {
        axios.get(`/post/items/${userId}?page=${page}`, {headers: {"Authorization": `Auth ${auth}`}})
        .then(res => {
            dispatch(setItems(res.data, page));
        })
        .catch(err  => {
            dispatch(actionItemFail(err.response));
        })
    }
}

export const getItem = (itemId) => {
    return dispatch => {
        axios.get(`/post/item/${itemId}`)
        .then(res => {
            dispatch(setItem(res.data));
        })
        .catch(err  => {
            dispatch(actionItemFail(err.response));
        })
    }
}

export const createItem = (formdata,auth) => {
    return dispatch => {
        dispatch(itemStart());
        axios.post('/post/item', formdata, {
            headers: {"Authorization": `Auth ${auth}`} 
        }).then(res => {
            dispatch(actionItemSucces(res.data));
        }).catch(err => {
            dispatch(actionItemFail(err.response));
        });
    }
} 

export const updateItem = (formdata,itemId,auth) => {
    return dispatch => {
        dispatch(itemStart());
        axios.put(`/post/item/${itemId}`, formdata, {
            headers: {"Authorization": `Auth ${auth}`} 
        }).then(res => {
            dispatch(actionItemSucces(res.data));
        }).catch(err => {
            dispatch(actionItemFail(err.response));
        });
    }
} 

export const deleteItem = (id,auth) => {
    return dispatch => {
        axios.delete(`/post/item/${id}`, {headers: {"Authorization": `Auth ${auth}`}})
        .then(res => {
            dispatch(actionItemSucces(res.data));
        })
        .catch(err  => {
            dispatch(actionItemFail(err.response));
        })
    }
}

export const itemAlertClean = () => {
    return {
        type: actionTypes.ACTION_ITEM_SUCCESS,
        message: '',
    }
}