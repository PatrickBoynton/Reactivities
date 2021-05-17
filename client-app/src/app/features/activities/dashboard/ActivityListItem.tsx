import React, { ReactElement, SyntheticEvent, useState } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';
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
    }

    return (
        <Item key={ activity.id }>
            <Item.Content>
                <Item.Header aw="a">
                    { activity.title }
                </Item.Header>
                <Item.Meta>
                    { activity.date }
                </Item.Meta>
                <Item.Description>
                    <div>{ activity.description }</div>
                    <div>{ activity.city }, { activity.venue }</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={ Link } to={ `/activities/${ activity.id }` } floated="right" content="view"
                            color="blue"/>
                    <Button
                        name={ activity.id }
                        loading={ loading && target === activity.id }
                        onClick={ (e) => handleActivityDelete(e, activity.id) }
                        floated="right"
                        content="delete"
                        color="red"/>
                    <Label basic content={ activity.category }/>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}

export default ActivityListItem;
