import React, { ReactElement } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
}

function ActivityDashboard({activities}: Props): ReactElement {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width='6'>
                {activities[0] &&
                <ActivityDetails activity={activities[0]} /> }
                <ActivityForm/>
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashboard;
