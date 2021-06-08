import React, { ReactElement } from 'react';
import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
}

const SelectInput = (props: Props): ReactElement => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <Select
        options={props.options}
        value={field.value || null}
        onChange={(event, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
        clearable
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
      <label>{props.label}</label>
    </Form.Field>
  );
};
export default SelectInput;
