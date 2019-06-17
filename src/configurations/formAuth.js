const AUTH_INPUTS = {
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
}

export {AUTH_INPUTS}