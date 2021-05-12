import React, { ReactElement } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';

interface Props {
    activity: Activity;
    handleCancelActivity: () => void;
    openForm: (id: string) => void;
}

function ActivityDetails({activity, handleCancelActivity, openForm}: Props): ReactElement {
    return (
        <Card fluid>
            <Image src={ `/assets/categoryImages/${ activity.category }.jpg` } alt="Category"/>

            <Card.Content>
                <Card.Header>
                    { activity.title }
                </Card.Header>
                <Card.Meta>
                    { activity.date }
                </Card.Meta>
                <Card.Description>
                    { activity.description }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button onClick={() => openForm(activity.id)} basic color="blue" content="Edit"/>
                    <Button onClick={handleCancelActivity} basic color="grey" content="Cancel"/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetails;
