import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

const CustomTextInput = ({placeholder, name, label}: Props) => {
	const [field, meta] = useField(name);
	return <FormField error={meta.touched && !!meta.error}>
		<label>{label}</label>
		<input {...field} {...placeholder} {...name} />
		{meta.touched && meta.error ? <Label basic color="red">{meta.error}</Label> : null}
	</FormField>;
};

export default CustomTextInput;