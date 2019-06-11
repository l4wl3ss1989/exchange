import React from 'react';
import FontAwesome from 'react-fontawesome';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import styles from './formfields.module.scss';

const FormFields = (props) => {
    
    const renderFields = () => {
        const formArray = [];

        for(let elementName in props.formData) {
            formArray.push({
                id: elementName,
                settings: props.formData[elementName]
            })
        }

        return formArray.map( (item,i) =>{
            return (
                <div key={i} className={styles.Form_element}>
                    {renderTemplates(item)}
                </div>
            )
        })
    }

    const showLabel = (show,label,name,icon=null) => {
        if(icon) {
            icon = <FontAwesome name={icon} />    
        }
        return show ? 
            <label for={name}>{icon}{label}</label>
        : null
    }

    const showImage = (val) => {
        return val ? 
            <img src={val} />
        : null
    }

    const changeHandler = (event,id,blur) => {
        const newState = props.formData;
        newState[id].value = event.target.value;        
        if(blur){
            let validData = validate(newState[id])
            newState[id].valid = validData[0];
            newState[id].validationMessage = validData[1];
        }
        if(id === 'image' && event.target.value !== '') {
            newState[id].prevImage = URL.createObjectURL(event.target.files[0]);
            newState[id].file = event.target.files[0];
        }

        newState[id].touched = blur;

        props.change(newState);
    }

    const validate = (element) => {
        let error = [true,''];

        // required
        if(element.validation.required && error[0]) {
            const valid = element.value.trim() !== '';
            const message = `${ !valid ? 'This field is required' : ''}`;
            error = !valid ? [valid,message] : error;
        }

        //isEmail
        if(element.validation.isEmail && error[0]) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            const valid = pattern.test(element.value);
            const message = `${ !valid ? 'Must be a valid email.' : ''}`;
            error = !valid ? [valid,message] : error;
        }

        // minLen
        if(element.validation.minLen && error[0]) {
            const valid = element.value.length >= element.validation.minLen;
            const message = `${ !valid ? `Must be greater than ${element.validation.minLen - 1}` : ''}`;
            error = !valid ? [valid,message] : error;
        }

        

        return  error;
    }

    const showValidation = (data) => {
        let errorMessage = null;

        if(data.validation && !data.valid){
            errorMessage = (
                <div className={styles.label_error}>
                    {data.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    const renderTemplates = (data) => {
        let formTemplate = null;
        let values = data.settings;
        switch(values.element) {
            case 'input':
                // auto generated attr. macke sure they mach the patter name.
                formTemplate = (
                    <Aux>
                        {showLabel(values.label,values.labelText,values.config.name)}                        
                        <input 
                            {...values.config}                            
                            value={values.value}
                            onBlur = {
                                (event) => changeHandler(event,data.id,true) 
                            }
                            onChange = {
                                (event) => changeHandler(event,data.id,false)
                            }
                        />
                        {showValidation(values)}
                    </Aux>
                )
                break;
            case 'textarea':
                formTemplate = (
                    <Aux>
                        {showLabel(values.label,values.labelText,values.config.name)}                        
                        <textarea 
                            {...values.config}                            
                            value={values.value}
                            onChange = {
                                (event) => changeHandler(event,data.id)
                            }
                        ></textarea>
                    </Aux>
                )
            break;
            case 'select':
                formTemplate = (
                    <Aux>
                        {showLabel(values.label,values.labelText,values.config.name)} 
                        <select
                            value={values.value}
                            name={values.config.name}
                            onChange = {
                                (event) => changeHandler(event,data.id)
                            }
                        >
                            { values.config.options.map( (item,i) =>(
                                <option key={i} value={item.val}>
                                    {item.text}
                                </option>
                            ))}
                        </select>
                    </Aux>
                )
                break;
            case 'image':
                formTemplate = (
                    <Aux>
                        {showImage(values.prevImage)}
                        {showLabel(values.label,values.labelText,values.config.name,values.labelIcon)}
                        <input
                            {...values.config}
                            value={values.value}
                            onChange = {
                                (event) => changeHandler(event,data.id,false)
                            }
                        />
                    </Aux>
                )
                break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }

    return (
        <div>
            {renderFields()}
        </div>
    );
};

export default FormFields;

/*
<input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg">

*/