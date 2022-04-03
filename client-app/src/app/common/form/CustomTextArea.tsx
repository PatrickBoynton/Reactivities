import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

const CustomTextArea = ({placeholder, name, rows, label}: Props) => {
	const [field, meta] = useField(name);
	return <FormField>
		<label>{label}</label>
		<textarea {...field} {...placeholder} {...rows} />
		{meta.touched && meta.error ? <Label basic color="red" content={meta.error} /> : null}
	</FormField>;
};

export default CustomTextArea;