import React, { ReactElement, useEffect } from 'react';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../../layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';


function ActivityDetails(): ReactElement {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();


    useEffect(() => {
        if (id) {
            loadActivity(id).then();
        }
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponent/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader/>
                <ActivityDetailsInfo/>
                <ActivityDetailsChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSidebar/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDetails);
