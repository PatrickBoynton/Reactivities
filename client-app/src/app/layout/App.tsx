import React, { ReactElement, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App(): ReactElement {
    const {activityStore} = useStore();

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    const handleSelectedActivity = (id: string): void => {
        setSelectedActivity(activities.find(activity => activity.id === id));
    };

    const handleCancelSelectedActivity = (): void => {
        setSelectedActivity(undefined);
    };

    const handleFormOpen = (id?: string): void => {
        id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
        setEditMode(true);
    };

    const handleFormClose = (): void => {
        setEditMode(false);
    };

    const handleEditOrCreate = (activity: Activity): void => {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }
    };

    const handleDeleteActivity = (id: string): void => {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
        });
        setSubmitting(false);
    };

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>;

    return (
        <>
            <NavBar openForm={ handleFormOpen }/>
            <Container style={ {marginTop: '7em'} }>

                <ActivityDashboard activities={ activityStore.activities }
                                   selectedActivity={ selectedActivity }
                                   handleSelectActivity={ handleSelectedActivity }
                                   handleCancelActivity={ handleCancelSelectedActivity }
                                   editMode={ editMode }
                                   openForm={ handleFormOpen }
                                   closeForm={ handleFormClose }
                                   editOrCreate={ handleEditOrCreate }
                                   deleteActivity={ handleDeleteActivity }
                                   submitting={ submitting }
                />
            </Container>
        </>
    );
}

export default observer(App);
