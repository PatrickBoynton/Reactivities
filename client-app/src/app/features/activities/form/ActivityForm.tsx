import React, { ReactElement } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
}

function ActivityForm({activity, closeForm}: Props): ReactElement {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title"/>
                <Form.TextArea placeholder="Description"/>
                <Form.Input placeholder="Category"/>
                <Form.Input placeholder="Date"/>
                <Form.Input placeholder="City"/>
                <Form.Input placeholder="Venue"/>
                <Button basic positive floated='right' type='submit' content='Create Activity'/>
                <Button onClick={closeForm} basic color='grey' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    );
}

export default ActivityForm;
