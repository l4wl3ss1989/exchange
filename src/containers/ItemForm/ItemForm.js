import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import formData from 'form-data';

import styles from './ItemFrom.module.scss';
import { ITEM_CATEGORIES } from '../../configurations/categories';
import * as actions from '../../store/actions/index';
import FormFields from '../../components/Forms/formFields';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

class ItemForm extends Component {

    state = {
        formData: {
            image:{
                element: 'image',
                value: '',
                label: true,
                labelIcon: 'cloud-upload',
                labelText: 'Upload Image',
                file: null,
                prevImage: null,
                config: {
                    name: 'image_input',
                    id: 'image_input',
                    type: 'file',
                    accept: 'image/png, image/jpg, image/jpeg',
                },
                validation: {
                    required: false
                },
                valid: true
            },
            title:{
                element: 'input',
                value: '',
                label: true,
                labelText: 'Title',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter your title'
                },
                validation: {
                    required: true,
                    minLen: 3
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            category: {
                element: 'select',
                value: ITEM_CATEGORIES[0].val,
                label: true,
                labelText: 'Category',
                config: {
                    name: 'category_input',
                    options: ITEM_CATEGORIES
                },
                validation: {
                    required: false
                },
                valid: true
            },
            content: {
                element: 'textarea',
                value: '',
                label: true,
                labelText: 'Description',
                config: {
                    name: 'content_input',
                    rows: 5,
                    //cols: 36
                },
                validation: {
                    required: false
                },
                valid: true
            },
        },
        itemId: null
    }

    componentDidMount() {
        //Item call
        //modify formData values
        if (this.props.location.query && !this.state.update){
            const query = this.props.location.query;
            const itemId = query.id;
            const updatedFormData = {
                ...this.state.formData
            }
            updatedFormData.title.value = query.title;
            updatedFormData.title.valid = true;
            updatedFormData.category.value = query.category;
            updatedFormData.content.value = query.content;
            updatedFormData.content.valid = true;
            updatedFormData.image.prevImage = query.imageUrl;

            this.setState({
                formData: updatedFormData,
                itemId: itemId
            });
        }
    }

    alertCancelHandler = () => {
        this.props.removeAlert();
        this.props.history.push('/'); 
    }

    updateForm = (newState) => {
        this.setState({       
            formData: newState  
        })
    }
 
    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for(let key in this.state.formData){
            if(key === 'image') {
                dataToSubmit[key] = this.state.formData[key].file ? this.state.formData[key].file : this.state.formData[key].prevImage ;
            } else {
                dataToSubmit[key] = this.state.formData[key].value;
            }
        }

        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid
        }

        if(formIsValid) {
            console.log(dataToSubmit)
            let formdata = new formData();
            formdata.append('image', dataToSubmit.image);
            formdata.append('title', dataToSubmit.title);
            formdata.append('category', dataToSubmit.category);
            formdata.append('content', dataToSubmit.content);
            if(this.state.itemId) {
                this.props.updateItem(formdata, this.state.itemId, this.props.isAuthenticated)
            }else {
                this.props.createItem(formdata, this.props.isAuthenticated);
            }
        }
    }

    render(){
        
        let spinner = null;
        if(this.props.loading) {
            spinner = <Spinner />;
        }

        return(
            <form onSubmit={this.submitForm} className={styles.ItemForm}>                
                <Modal 
                    show={this.props.storedMessage && this.props.storedMessage !== '' ? true : false} 
                    modalClosed={this.alertCancelHandler}
                >     
                    {this.props.storedMessage}
                </Modal>
                {spinner}
                <FormFields 
                    formData={this.state.formData}
                    onblur={(newState) => this.updateForm(newState)}
                    change={(newState) => this.updateForm(newState)}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        storedMessage: state.items.message,
        loading: state.items.loading,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createItem: (data, auth) => dispatch(actions.createItem(data, auth)),
        updateItem: (data, itemId, auth) => dispatch(actions.updateItem(data, itemId, auth)),
        removeAlert: () => dispatch(actions.itemAlertClean()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);