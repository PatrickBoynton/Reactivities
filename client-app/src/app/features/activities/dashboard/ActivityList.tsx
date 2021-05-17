import React, { ReactElement, Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';

function ActivityList(): ReactElement {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return (
        <>
            { groupedActivities.map(([group, activities]) => (
                <Fragment key={ group }>
                    <Header sub color="teal">
                        { group }
                    </Header>
                    { activities.map(activity => (
                        <ActivityListItem key={ activity.id } activity={ activity }/>
                    )) }
                </Fragment>
            )) }
        </>
    )
        ;
}

export default observer(ActivityList);
