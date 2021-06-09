import { Form, Formik } from 'formik';
import React from 'react';
import TextInput from '../../common/form/TextInput';
import { Button } from 'semantic-ui-react';

function LoginForm() {
    return (
        <Formik initialValues={ {email: '', password: ''} } onSubmit={ (values) => console.log(values) }>
            { ({handleSubmit}) =>
                <Form className="ui form" onSubmit={ handleSubmit } autoComplete="off">
                    <TextInput placeholder="Email" name="email"/>
                    <TextInput placeholder="Password"
                               name="password"
                               type="password"/>

                    <Button positive content='Login' type='submit' fluid/>
                </Form> }
        </Formik>
    );
}

export default LoginForm;
