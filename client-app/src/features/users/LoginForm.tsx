import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/store";

const LoginForm = () => {
	const { userStore } = useStore();
	return <Formik initialValues={{ email: "", password: "" }}
				   onSubmit={values => userStore.login(values)}>
		{({ handleSubmit, isSubmitting }) => <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
			<CustomTextInput placeholder="Email" name="email" />
			<CustomTextInput placeholder="Password" name="password" type="password" />
			<Button loading={isSubmitting} positive content="Login" fluid type="submit" />
		</Form>}

	</Formik>;
};

export default observer(LoginForm);