import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory, Link } from 'react-router-dom';
import LoadingComponent from '../../../layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import SelectInput from '../../../common/form/SelectInput';
import { categoryOptions } from '../../../common/form/options/categoryOptions';
import DateInput from '../../../common/form/DateInput';
import { v4 as uuid } from 'uuid';
import { Activity } from '../../../models/activity';

function ActivityForm(): ReactElement {
  const history = useHistory();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The title is required'),
    description: Yup.string().required('The description is required'),
    category: Yup.string().required('The category is required'),
    date: Yup.string().required('The date is required').nullable(),
    venue: Yup.string().required('The venue is required'),
    city: Yup.string().required('The city is required'),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleSubmit = (activity: Activity): void => {
    if (activity.id.length <= 0) {
      let newActivity: Activity = {
        ...activity,
        id: uuid.toString(),
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(activity) => handleSubmit(activity)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput placeholder="title" name="title" />
            <TextArea placeholder="Description" rows={3} name="description" />
            <SelectInput options={categoryOptions} placeholder="category" name="category" />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, YYYY h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <TextInput placeholder="city" name="city" />
            <TextInput placeholder="venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              basic
              positive
              floated="right"
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities/"
              basic
              color="grey"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
