import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import { useStore } from '../../../stores/store';

interface Props {
    editOrCreate: (activity: Activity) => void;
    submitting: boolean;
}

function ActivityForm({ editOrCreate,
                          submitting }: Props): ReactElement {
    const {activityStore} = useStore();
    const  {selectedActivity, closeForm} = activityStore;

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
        editOrCreate(activity);
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
                <Button loading={submitting} basic positive floated="right" type="submit" content="Submit"/>
                <Button onClick={ closeForm } basic color="grey" floated="right" type="button" content="Cancel"/>
            </Form>
        </Segment>
    );
}

export default ActivityForm;
