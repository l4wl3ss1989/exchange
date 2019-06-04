import React, { Component } from 'react';

import styles from './ItemFrom.module.scss';
import FormFields from '../../components/Forms/formFields';

class ItemFrom extends Component {

    state = {
        formData: {
            image:{
                element: 'image',
                value: '',
                label: true,
                labelText: 'Image',
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
                value: '',
                label: true,
                labelText: 'Category',
                config: {
                    name: 'category_input',
                    options: [
                        {val:'0',text:'Toy'},
                        {val:'1',text:'House'},
                        {val:'2',text:'Somthing'}
                    ]
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
        }
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
            dataToSubmit[key] = this.state.formData[key].value;
        }

        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid
        }

        if(formIsValid) {
            console.log(dataToSubmit)
            // axios.post(url, dataToSubmit)
        }
    }

    render(){
        return(
            <form onSubmit={this.submitForm} className={styles.ItemForm}>
                {/* <img src={this.state.image}/> */}
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

export default ItemFrom;