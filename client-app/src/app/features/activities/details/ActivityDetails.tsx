import React, { ReactElement, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';


const ActivityDetails = (): ReactElement => {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();


    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponent/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSidebar/>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDetails);
