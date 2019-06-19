import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    totalItems: 0,
    message: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ITEMS:
            return { 
                ...state,
                items: [ ...action.items ],
                totalItems: action.totalItems,
                message: action.message
            };    
        case actionTypes.FETCH_ITEMS_FAILED:
            return {
                ...state,
                message: action.message
            };

        case actionTypes.DELETE_ITEM_SUCCESS:
            debugger;
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
}

export default reducer;