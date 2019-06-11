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
        //Temporary adding headers before I add authentification
        axios.get('/post/items', {headers: {"Authorization": 'TEST eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imw0d2wzc3NAZ21haWwuY29tIiwidXNlcklkIjoiNWNjOWUzOTNlNzcwZWIzMWYwMGU4YTgzIiwiaWF0IjoxNTYwMDIyNDg2LCJleHAiOjE1NjAwMjYwODZ9.kd3D7ZaMrBDFoQ_OCG-4WL97RXNMu3lj_VphSELRRVA'}})
        .then(res => {
            dispatch(setItems(res.data));
        })
        .catch(err  => {
            dispatch(setItemsFail(err.response));
        })
    }
}