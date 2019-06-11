import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormFields from '../../components/Forms/formFields';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.module.scss';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        formData: {
            email:{
                element: 'input',
                value: '',
                label: true,
                labelText: 'Mail Address',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Password',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    minLen: 6
                },
            }
        },
        isSignup: false
    }
    
    updateForm = (newState) => {
        this.setState({       
            formData: newState  
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.formData.email.value, 
            this.state.formData.password.value, 
            this.state.isSignup
        );
    }

    sitchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {

        let form = <form onSubmit={this.submitHandler} className={styles.AuthFrom_signin}>
            <FormFields 
                formData={this.state.formData}
                onblur={(newState) => this.updateForm(newState)}
                change={(newState) => this.updateForm(newState)}
            />
            <button type="submit">{this.state.isSignup ? 'Sign Up' : 'Sign In' }</button>
        </form>

        if(this.state.isSignup && !this.props.loading) {
            form = (
                <form onSubmit={this.submitHandler} className={styles.AuthFrom_signup}>
                    SUGIN UP FORM
                    <button type="submit">{this.state.isSignup ? 'Sign Up' : 'Sign In' }</button>
                </form>);
        }

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to="/"/>
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                SWITCH TO SIGN IN
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
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);