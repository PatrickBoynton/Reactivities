import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
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

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (id) loadActivity(id).then(activity => setActivity(activity!));
	}, [id, loadActivity]);

	if (loadingInitial) return <LoadingComponent content="Loading..." />;

	return <Segment clearing>
		<Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
			{({values: activity, handleChange, handleSubmit}) =>
				<Form onSubmit={handleSubmit} autoComplete="off">
					<Form.Input placeholder="Title"
						value={activity.title}
						name="title"
						onChange={handleChange} />
					<Form.TextArea placeholder="Description"
						value={activity.description}
						name="description"
						onChange={handleChange} />
					<Form.Input placeholder="Category"
						value={activity.category}
						name="category"
						onChange={handleChange} />
					<Form.Input type="date"
						placeholder="Date"
						value={activity.date}
						name="date"
						onChange={handleChange} />
					<Form.Input placeholder="City"
						value={activity.city}
						name="city"
						onChange={handleChange} />
					<Form.Input placeholder="Venue"
						value={activity.venue}
						name="venue"
						onChange={handleChange} />
					<Button loading={loading} floated="right" positive type="submit" content="Submit" />
					<Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
				</Form>
			}
		</Formik>
	</Segment>;
};

export default observer(ActivityForm);