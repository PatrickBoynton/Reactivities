import React, { ReactElement } from 'react';
import { useStore } from '../../stores/store';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Header, Label } from 'semantic-ui-react';
import TextInput from '../../common/form/TextInput';
import * as Yup from 'yup';

const RegisterForm = (): ReactElement => {
    const {userStore} = useStore();

    return (
        <Formik initialValues={ {displayName: '', username: '', email: '', password: '', error: null} }
                onSubmit={ (values, {setErrors}) => userStore.register(values)
                    .catch(error => setErrors({error: 'Invalid email or password.'})) }
                validationSchema={ Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                }) }
        >
            { ({handleSubmit, isSubmitting, errors, isValid, dirty}) =>
                <Form className="ui form"
                      onSubmit={ handleSubmit }
                      autoComplete="off">
                    <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center"/>
                    <ErrorMessage name="error" render={ () => <Label style={ {marginBottom: 10} } basic color="red"
                                                                     content={ errors.error }/> }/>
                    <TextInput placeholder="DisplayName" name="displayName"/>
                    <TextInput placeholder="UserName" name="userName"/>
                    <TextInput placeholder="Email" name="email"/>
                    <TextInput placeholder="Password"
                               name="password"
                               type="password"/>

                    <Button disabled={ !isValid || !dirty || isSubmitting }
                            loading={ isSubmitting }
                            positive
                            content="Register"
                            type="submit"
                            fluid/>
                </Form> }
        </Formik>
    );
};

export default RegisterForm;
