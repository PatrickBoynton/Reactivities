import React, { ReactElement, useEffect, useState } from 'react';
import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory, Link } from 'react-router-dom';
import LoadingComponent from '../../../layout/LoadingComponent';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import SelectInput from '../../../common/form/SelectInput';
import { categoryOptions } from '../../../common/form/options/categoryOptions';
import DateInput from '../../../common/form/DateInput';

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

    const validationSchema = Yup.object({
        title: Yup.string().required('The title is required'),
        description: Yup.string().required('The description is required'),
        category: Yup.string().required('The category is required'),
        date: Yup.string().required('The date is required'),
        venue: Yup.string().required('The venue is required'),
        city: Yup.string().required('The city is required'),
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
            <Formik
                validationSchema={ validationSchema }
                enableReinitialize
                initialValues={ activity }
                onSubmit={ value => console.log(value) }>
                { ({handleSubmit}) => (
                    <Form className="ui form" onSubmit={ handleSubmit } autoComplete="off">
                        <TextInput placeholder="title" name="title"/>
                        <TextArea placeholder="Description"
                                  rows={3}
                                   name="description"/>
                        <SelectInput options={categoryOptions}
                                     placeholder="category"
                                     name="category"/>
                        <DateInput
                                   placeholderText="Date"
                                   name="date"
                                   showTimeSelect
                                   timeCaption='time'
                                   dateFormat='MMMM d, YYYY h:mm aa'
                        />
                        <TextInput placeholder="city" name="city"/>
                        <TextInput placeholder="venue" name="venue"/>
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
