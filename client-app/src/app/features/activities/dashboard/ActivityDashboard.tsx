import React, { ReactElement } from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelectActivity: (id: string) => void;
    handleCancelActivity: () => void;
}

function ActivityDashboard({activities,
                               selectedActivity,
                               handleSelectActivity,
                               handleCancelActivity}: Props): ReactElement {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities}
                              handleSelectActivity={handleSelectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                <ActivityDetails activity={selectedActivity}
                    handleCancelActivity={handleCancelActivity} /> }
                <ActivityForm/>
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashboard;
