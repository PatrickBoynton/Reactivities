import React, { ReactElement } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';

interface Props {
    activities: Activity[];
}

function ActivityDashboard({activities}: Props): ReactElement {
    return (
        <Grid>
            <Grid.Column width="10">
                <List>
                    { activities.map(activity => (
                        <List.Item key={ activity.id }>
                            { activity.title }
                        </List.Item>
                    )) }
                </List>
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashboard;
