import React, { ReactElement } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

function ActivityForm(): ReactElement {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title"/>
                <Form.TextArea placeholder="Description"/>
                <Form.Input placeholder="Category"/>
                <Form.Input placeholder="Date"/>
                <Form.Input placeholder="City"/>
                <Form.Input placeholder="Venue"/>
                <Button positive floated='right' type='submit' content='Create Activity'/>
                <Button positive floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    );
}

export default ActivityForm;
