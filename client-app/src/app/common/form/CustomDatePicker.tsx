import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { FormField, Label } from "semantic-ui-react";

const CustomDatePicker = (props: Partial<ReactDatePickerProps>) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const [field, meta, helpers] = useField(props.name!);
	return <FormField>
		<DatePicker {...field}
			{...props}
			selected={(field.value && new Date(field.value) || null)}
			onChange={value => helpers.setValue(value)} />
		{meta.touched && meta.error ? <Label basic color="red">{meta.error}</Label> : null}
	</FormField>;
};

export default CustomDatePicker;