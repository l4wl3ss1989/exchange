import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    item: null,
    updateItem: null,
    totalItems: 0,
    message: '',
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ITEM_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SET_ITEM:
            return {
                ...state,
                item: action.item,
                message: action.message,
                loading: false
            };
        case actionTypes.SET_ITEMS:
            return { 
                ...state,
                items: [ ...action.items ],
                totalItems: action.totalItems,
                message: action.message,
                loading: false
            };    
        case actionTypes.ACTION_ITEM_FAILED:
            return {
                ...state,
                message: action.message,
                loading: false
            };
        case actionTypes.ACTION_ITEM_SUCCESS:
            return {
                ...state,
                message: action.message,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;