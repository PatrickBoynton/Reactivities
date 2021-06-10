import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import TextInput from '../../common/form/TextInput';
import { Button, Label } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik initialValues={ {email: '', password: '', error: null} }
                onSubmit={ (values, {setErrors}) => userStore.login(values)
                    .catch(error => setErrors({error: 'Invalid email or password.'})) }>
            { ({handleSubmit, isSubmitting, errors}) =>
                <Form className="ui form"
                      onSubmit={ handleSubmit }
                      autoComplete="off">
                    <ErrorMessage name="error" render={ () => <Label style={ {marginBottom: 10} } basic color="red"
                                                                     content={errors.error }/> }/>
                    <TextInput placeholder="Email" name="email"/>
                    <TextInput placeholder="Password"
                               name="password"
                               type="password"/>

                    <Button loading={ isSubmitting }
                            positive
                            content="Login"
                            type="submit"
                            fluid/>
                </Form> }
        </Formik>
    );
}

export default observer(LoginForm);
