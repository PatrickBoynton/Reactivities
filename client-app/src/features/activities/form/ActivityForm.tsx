import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import CustomDatePicker from "../../../app/common/form/CustomDatePicker";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";


const ActivityForm = () => {
	const history = useHistory();
	const {activityStore} = useStore();
	const {loadActivity, createActivity, updateActivity, loading, loadingInitial} = activityStore;
	const {id} = useParams<{ id: string }>();
	const [activity, setActivity] = useState({
		id: "",
		title: "",
		category: "",
		description: "",
		date: "",
		city: "",
		venue: ""
	});

	const validationSchema = Yup.object({
		title: Yup.string().required(),
		description: Yup.string().required(),
		category: Yup.string().required(),
		date: Yup.string().required(),
		venue: Yup.string().required(),
		city: Yup.string().required(),
	});

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (id) loadActivity(id).then(activity => setActivity(activity!));
	}, [id, loadActivity]);

	if (loadingInitial) return <LoadingComponent content="Loading..." />;

	return <Segment clearing>
		<Formik validationSchema={validationSchema}
			enableReinitialize
			initialValues={activity}
			onSubmit={values => console.log(values)}>
			{({handleSubmit}) =>
				<Form className="ui form"
					onSubmit={handleSubmit}
					autoComplete="off">
					<CustomTextInput placeholder="Title" name="title" />
					<CustomTextArea placeholder="Description" name="description" rows={3} />
					<CustomSelectInput options={categoryOptions} placeholder="Category" name="category" />
					<CustomDatePicker placeholderText="Date"
						name="date"
						showTimeSelect
						timeCaption="time"
						dateFormat="MMMM d, yyyy h:mm aa"
					/>
					<CustomTextInput placeholder="City" name="city" />
					<CustomTextInput placeholder="Venue" name="venue" />
					<Button loading={loading} floated="right" positive type="submit" content="Submit" />
					<Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
				</Form>
			}
		</Formik>
	</Segment>;
};

export default observer(ActivityForm);