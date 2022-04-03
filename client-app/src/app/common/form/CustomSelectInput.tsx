import { useField } from "formik";
import { DropdownItemProps, FormField, Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    options: DropdownItemProps[];
    label?: string;
}

const CustomSelectInput = ({placeholder, name, label, options}: Props) => {
	const [field, meta, helpers] = useField(name);
	return <FormField>
		<label>{label}</label>
		<Select onChange={(event, data) => helpers.setValue(data.value)}
			onBlur={() => helpers.setTouched(true)}
			options={options}
			value={field.value || null}
			placeholder={placeholder}
			clearable />
		{meta.touched && meta.error ? <Label basic color="red">{meta.error}</Label> : null}
	</FormField>;
};

export default CustomSelectInput;