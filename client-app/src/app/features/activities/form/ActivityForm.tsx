import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../layout/LoadingComponent';

function ActivityForm(): ReactElement {
    const {activityStore} = useStore();
    const {createActivity,
           updateActivity,
           loading,
           loadActivity,
           loadingInitial} = activityStore;

    const {id} = useParams<{id: string}>();
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
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])


    const handleSubmit = (): void => {
        activity.id ? updateActivity(activity) : createActivity(activity);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;

        setActivity({...activity, [name]: value});
    };

    if (loadingInitial) return <LoadingComponent content='Loading activity...'/>

    return (
        <Segment clearing>
            <Form onSubmit={ handleSubmit } autoComplete="off">
                <Form.Input placeholder="Title"
                            value={ activity.title }
                            name="title"
                            onChange={ handleInput }/>
                <Form.TextArea placeholder="Description"
                               value={ activity.description }
                               name="description"
                               onChange={ handleInput }/>
                <Form.Input placeholder="Category"
                            value={ activity.category }
                            name="category"
                            onChange={ handleInput }/>
                <Form.Input placeholder="Date"
                            type="date"
                            value={ activity.date }
                            name="date"
                            onChange={ handleInput }/>
                <Form.Input placeholder="City"
                            value={ activity.city }
                            name="city"
                            onChange={ handleInput }/>
                <Form.Input placeholder="Venue"
                            value={ activity.venue }
                            name="venue"
                            onChange={ handleInput }/>
                <Button loading={ loading } basic positive floated="right" type="submit" content="Submit"/>
                <Button  basic color="grey" floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    );
}

export default observer(ActivityForm);
