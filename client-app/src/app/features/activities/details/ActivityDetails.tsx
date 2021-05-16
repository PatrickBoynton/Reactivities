import React, { ReactElement, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../layout/LoadingComponent';
import { observer } from 'mobx-react-lite';


function ActivityDetails(): ReactElement {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();


    useEffect(() => {
        if (id) {
            loadActivity(id).then();
        }
    }, [id, loadActivity])

    // TODO figure out why refreshing the page makes activity disappear.
    if (loadingInitial || !activity) return <LoadingComponent/>;

    return (
        <Card fluid>
            <Image src={ `/assets/categoryImages/${ activity?.category }.jpg` } alt="Category"/>

            <Card.Content>
                <Card.Header>
                    { activity?.title }
                </Card.Header>
                <Card.Meta>
                    { activity?.date }
                </Card.Meta>
                <Card.Description>
                    { activity?.description }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button basic color="blue" content="Edit"/>
                    <Button basic color="grey" content="Cancel"/>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default observer(ActivityDetails);
