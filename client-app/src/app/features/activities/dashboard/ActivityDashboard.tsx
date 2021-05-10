import React, { ReactElement } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
}

function ActivityDashboard({activities}: Props): ReactElement {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} />
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashboard;
