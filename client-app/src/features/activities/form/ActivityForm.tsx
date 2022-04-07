import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import CustomDatePicker from "../../../app/common/form/CustomDatePicker";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import { history } from "../../../index";


const ActivityForm = () => {
	const { activityStore } = useStore();
	const { loadActivity, loading, loadingInitial, createActivity, updateActivity } = activityStore;
	const { id } = useParams<{ id: string }>();
	const [activity, setActivity] = useState<Activity>({
		id: "",
		title: "",
		category: "",
		description: "",
		date: null,
		city: "",
		venue: "",
	});

	const validationSchema = Yup.object({
		title: Yup.string().required(),
		description: Yup.string().required(),
		category: Yup.string().required(),
		date: Yup.string().required("Date is required.").nullable(),
		venue: Yup.string().required(),
		city: Yup.string().required(),
	});

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (id) loadActivity(id).then(activity => setActivity(activity));
	}, [id, loadActivity]);

	const handleFormSubmit = (activity: Activity) => {
		if (activity.id.length === 0) {
			const newActivity = {
				...activity,
				id: uuid(),
			};
			createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
		} else {
			updateActivity(activity).then(() => history.push(`/activity/${activity.id}`));
		}
	};


	if (loadingInitial) return <LoadingComponent content="Loading..." />;

	return <Segment clearing>
		<Header content="Activity Details" subheader color="teal" />
		<Formik validationSchema={validationSchema}
			enableReinitialize
			initialValues={activity}
			onSubmit={values => handleFormSubmit(values)}>
			{({ handleSubmit, isValid, isSubmitting, dirty }) =>
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
					<Header content="Location Details" sub color="teal" />
					<CustomTextInput placeholder="City" name="city" />
					<CustomTextInput placeholder="Venue" name="venue" />
					<Button disabled={isSubmitting || !dirty || !isValid}
						loading={loading}
						floated="right"
						positive
						type="submit"
						content="Submit" />
					<Button as={Link}
						to="/activities"
						floated="right"
						type="button"
						content="Cancel" />
				</Form>
			}
		</Formik>
	</Segment>;
};

export default observer(ActivityForm);