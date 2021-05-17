import React, { ReactElement, SyntheticEvent, useState } from 'react';
import { Button, Icon, Item, ItemImage, Label, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Activity } from '../../../models/activity';
import { useStore } from '../../../stores/store';

interface Props {
    activity: Activity,
}

function ActivityListItem({activity}: Props): ReactElement {
    const {activityStore} = useStore();
    const {deleteActivity, loading} = activityStore;
    const [target, setTarget] = useState('');

    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string): void => {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    };

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <ItemImage
                            size="tiny"
                            circular
                            src="/assets/user.png"/>
                        <Item.Content>
                            <Item.Header as={ Link } to={ `/activities/${ activity.id }` }>
                                { activity.title }
                            </Item.Header>
                            <Item.Description>
                                Hosted By: Bob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <span>
                    <Icon name="clock"/> { activity.date }
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>

            <Segment secondary>
                Attendees go here.
            </Segment>

            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link}
                        to={`/activities/${activity.id}`}
                        color='teal'
                        floated='right'
                        content='view'/>
            </Segment>
        </Segment.Group>
    );
}

export default ActivityListItem;
