import * as actionTypes from './actionTypes';
import axios from '../../axios.exchange';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 3600 * 1000) //1h
    }
}

export const auth = (email, password, isSignup) => {
    debugger;
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password
        }

        axios.post('/auth/login', authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.token, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                // console.log(err)
                dispatch(authFail(err.response.data.error));
            })
    }
}