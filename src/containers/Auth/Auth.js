import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormFields from '../../components/Forms/formFields';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import styles from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import {AUTH_INPUTS} from '../../configurations/formAuth';

class Auth extends Component {

    state = {
        formData: AUTH_INPUTS,
        isSignup: false
    }
    
    updateForm = (newState) => {
        this.setState({       
            formData: newState  
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let sendData = {}        
        sendData.email = this.state.formData.email.value;
        sendData.password = this.state.formData.password.value; 
        if(this.state.isSignup) {
            sendData.name = this.state.formData.name.value;
            sendData.tel = this.state.formData.tel.value;
        }
        this.props.onAuth(
            sendData,
            this.state.isSignup
        );
    }

    sitchAuthModeHandler = () => {
        this.setState(prevState => {
            return { 
                formData: AUTH_INPUTS,
                isSignup: !prevState.isSignup
            }
        })
    }

    alertCancelHandler = () => {
        //this.setState({alert: false});
        this.props.removeAlert();
    }

    render() {
        let formFields = {...this.state.formData};        
        
        if(!this.state.isSignup) {
            delete formFields.tel;
            delete formFields.name;
        }

        let form = <form onSubmit={this.submitHandler} className={this.state.isSignup ? styles.AuthFrom_signup : styles.AuthFrom_signin}>
            <FormFields 
                formData={formFields}
                onblur={(newState) => this.updateForm(newState)}
                change={(newState) => this.updateForm(newState)}
            />
            <button type="submit">{this.state.isSignup ? 'Sign Up' : 'Sign In'}</button>
        </form>



        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to="/"/>
        }

        return (            
            <div className={styles.Auth}>
                <Modal show={this.props.error ? true : false} modalClosed={this.alertCancelHandler}>     
                    {this.props.error}
                </Modal>
                {authRedirect}
                <button 
                    onClick={this.sitchAuthModeHandler}
                >Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</button>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (data, isSignup) => dispatch(actions.auth(data, isSignup)),
        removeAlert: () => dispatch(actions.authErrorClean())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);