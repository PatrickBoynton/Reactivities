import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory, Link } from 'react-router-dom';
import LoadingComponent from '../../../layout/LoadingComponent';
import { Formik, Form, Field } from 'formik';
import { v4 as uuid } from 'uuid';
import { Activity } from '../../../models/activity';

function ActivityForm(): ReactElement {
    const history = useHistory();
    const {activityStore} = useStore();
    const {
        createActivity,
        updateActivity,
        loading,
        loadActivity,
        loadingInitial
    } = activityStore;

    const {id} = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);


    // const handleSubmit = (): void => {
    //     if (activity.id.length <= 0) {
    //         let newActivity: Activity = {
    //             ...activity,
    //             id: uuid.toString()
    //         };
    //         createActivity(newActivity).then(() => history.push(`/activities/${ newActivity.id }`));
    //     } else {
    //         updateActivity(activity).then(() => history.push(`/activities/${ activity.id }`));
    //     }
    // };
    //
    // const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    //     const {name, value} = e.target;
    //
    //     setActivity({...activity, [name]: value});
    // };

    if (loadingInitial) return <LoadingComponent content="Loading activity..."/>;

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={ activity } onSubmit={ value => console.log(value) }>
                { ({handleSubmit}) => (
                    <Form className="ui form" onSubmit={ handleSubmit } autoComplete="off">
                        <Field placeholder="Title"
                               name="title"/>
                        <Field placeholder="Description"
                               name="description"/>
                        <Field placeholder="Category"
                               name="category"/>
                        <Field placeholder="Date"
                               type="date"
                               name="date"/>
                        <Field placeholder="City"
                               name="city"/>
                        <Field placeholder="Venue"
                               name="venue"/>

                        <Button loading={ loading }
                                basic
                                positive
                                floated="right"
                                type="submit"
                                content="Submit"/>
                        <Button as={ Link }
                                to="/activities/"
                                basic
                                color="grey"
                                floated="right"
                                type="button"
                                content="Cancel"/>
                    </Form>

                ) }
            </Formik>

        </Segment>
    );
}

export default observer(ActivityForm);
