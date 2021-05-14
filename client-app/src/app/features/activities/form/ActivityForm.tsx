import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';

function ActivityForm(): ReactElement {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    };

    const [activity, setActivity] = useState(initialState);


    const handleSubmit = (): void => {
        activity.id ? updateActivity(activity) : createActivity(activity);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;

        setActivity({...activity, [name]: value});
    };

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
                <Button onClick={ closeForm } basic color="grey" floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    );
}

export default observer(ActivityForm);
