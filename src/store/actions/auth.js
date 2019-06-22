import * as actionTypes from './actionTypes';
import axios from '../../axios.exchange';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId, isSignup) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId,
        error: isSignup ? 'Register has been succesfull go to Sign In!' : null
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 3600 * 1000) //1h
    }
}

export const auth = (authData, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        
        axios({
            method: isSignup ? 'put' : 'post',
            url: `/auth/${isSignup ? 'signup' : 'login'}`,
            data: authData
        })
        .then(response => {
            let token = response.data.token ? response.data.token : null;
            dispatch(authSuccess(token, response.data.userId, isSignup));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            // console.log(err)
            dispatch(authFail(err.response.data.message));
        });  
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authErrorClean = () => {
    return dispatch => {
        dispatch(authFail(null));
    }
}