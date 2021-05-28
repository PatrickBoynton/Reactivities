import React, { ReactElement, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard = (): ReactElement => {

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if (activityRegistry.size === 0) loadActivities();
    }, [activityRegistry, loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>;

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDashboard);
