import React, { ReactElement } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    activities: Activity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

function ActivityDashboard({
                               activities,
                               deleteActivity,
                               submitting,
                           }: Props): ReactElement {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={ activities }
                              deleteActivity={ deleteActivity }
                              submitting={submitting}
                />
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
