import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Label } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/store";

const LoginForm = () => {
	const { userStore } = useStore();
	return <Formik initialValues={{ email: "", password: "", error: null }}
				   onSubmit={(values, { setErrors }) => userStore.login(values)
					   .catch(error => setErrors({ error: "Invalid email or password." }))}>
		{({ handleSubmit, isSubmitting, errors }) => <Form className="ui form" onSubmit={handleSubmit}
														   autoComplete="off">
			<ErrorMessage name="error"
						  render={() => <Label style={{ marginBottom: 10 }}
											   basic
											   color="red"
											   content={errors.error} />} />
			<CustomTextInput placeholder="Email" name="email" />
			<CustomTextInput placeholder="Password" name="password" type="password" />
			<Button loading={isSubmitting} positive content="Login" fluid type="submit" />
		</Form>}

	</Formik>;
};

export default observer(LoginForm);