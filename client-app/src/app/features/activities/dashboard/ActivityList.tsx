import React, { ReactElement } from 'react';
import { Activity } from '../../../models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
}

function ActivityList({activities, handleSelectActivity}: Props): ReactElement {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header aw='a'>
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>
                                {activity.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => handleSelectActivity(activity.id)} floated='right' content='view' color='blue' />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}

export default ActivityList;
