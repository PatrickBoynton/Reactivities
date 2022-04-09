import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";

const LoginForm = () => {
	return <Formik initialValues={{ email: "", password: "" }}
				   onSubmit={values => console.log(values)}>
		{({ handleSubmit }) => <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
			<CustomTextInput placeholder="Email" name="email" />
			<CustomTextInput placeholder="Password" name="password" type="password" />
			<Button positive content="Login" fluid type="submit" />
		</Form>}

	</Formik>;
};

export default LoginForm;