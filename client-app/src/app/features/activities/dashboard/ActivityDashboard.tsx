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
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}

function ActivityDashboard({
                               activities,
                               selectedActivity,
                               handleSelectActivity,
                               handleCancelActivity,
                               editMode,
                               openForm,
                               closeForm
                           }: Props): ReactElement {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={ activities }
                              handleSelectActivity={ handleSelectActivity }/>
            </Grid.Column>
            <Grid.Column width="6">
                { selectedActivity && !editMode &&
                <ActivityDetails activity={ selectedActivity }
                                 handleCancelActivity={ handleCancelActivity }
                                 openForm={ openForm }/> }

                { editMode &&
                <ActivityForm closeForm={ closeForm }
                              activity={ selectedActivity }/>
                }
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashboard;