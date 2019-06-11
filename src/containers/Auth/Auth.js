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
            name: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Name',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true                  
                }

            },
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
            },
            tel: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Telephone',
                config: {
                    name: 'tel_input',
                    type: 'tel',
                    placeholder: 'Enter your telephone'
                },
                validation: {
                    required: true
                    // isNumber                  
                }
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
                ...prevState,
                isSignup: !prevState.isSignup
            }
        })
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
        onAuth: (data, isSignup) => dispatch(actions.auth(data, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);