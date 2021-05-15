import React, { ReactElement, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../layout/LoadingComponent';

function ActivityDashboard(): ReactElement {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    useEffect(() => {
        // Added the then to make my IDE happy. It's not really necessary.
        activityStore.loadActivities().then(x => console.log(x));
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>;

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                { selectedActivity && !editMode &&
                <ActivityDetails /> }

                { editMode &&
                <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDashboard);
