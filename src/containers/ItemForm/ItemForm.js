import React, { Component } from 'react';

import styles from './ItemFrom.module.scss';
import FormFields from '../../components/Forms/formFields';
import axios from '../../axios.exchange';
import formData from 'form-data';

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
        debugger;
        for(let key in this.state.formData){
            if(key === 'image') {
                dataToSubmit[key] = this.state.formData[key].file;
            } else {
                dataToSubmit[key] = this.state.formData[key].value;
            }
        }

        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid
        }

        if(formIsValid) {
            console.log(dataToSubmit)
            debugger;
            let formdata = new formData();
            formdata.append('image', dataToSubmit.image);
            formdata.append('title', dataToSubmit.title);
            formdata.append('content', dataToSubmit.content);

            axios.post('/post/item', formdata,{
                    headers: {'Authorization': 'TEST eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imw0d2wzc3NAZ21haWwuY29tIiwidXNlcklkIjoiNWNjOWUzOTNlNzcwZWIzMWYwMGU4YTgzIiwiaWF0IjoxNTYwMDA3MTI1LCJleHAiOjE1NjAwMTA3MjV9.d6nfkeWqKtLYZTPY8fX7zuOryufltalT8-zeQsqhBU4'} 
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            }) ;
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

export default ItemForm;