import React, { ReactElement } from 'react';
import { Form, Label } from 'semantic-ui-react';
import { useField } from 'formik';

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

const TextArea = (props: Props): ReactElement => {
    const [field, meta] = useField(props.name);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )};

export default TextArea;
