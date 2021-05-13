import React, { ReactElement, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App(): ReactElement {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Activities.list().then((response) => {
            let activities: Activity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            });
            setActivities(activities);
            setLoading(false);
        });
    }, []);

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
        activity.id
            ?
            setActivities([...activities.filter(x => x.id !== activity.id), activity])
            :
            setActivities([...activities, {...activity, id: uuid()}]);

        setEditMode(false);
        setSelectedActivity(activity);
    };

    const handleDeleteActivity = (id: string): void => {
        setActivities([...activities.filter(x => x.id !== id)]);
    };

    if (loading) return <LoadingComponent content='Loading app'/>

    return (
        <>
            <NavBar openForm={ handleFormOpen }/>
            <Container style={ {marginTop: '7em'} }>
                <ActivityDashboard activities={ activities }
                                   selectedActivity={ selectedActivity }
                                   handleSelectActivity={ handleSelectedActivity }
                                   handleCancelActivity={ handleCancelSelectedActivity }
                                   editMode={ editMode }
                                   openForm={ handleFormOpen }
                                   closeForm={ handleFormClose }
                                   editOrCreate={ handleEditOrCreate }
                                   deleteActivity={ handleDeleteActivity }
                />
            </Container>
        </>
    );
}

export default App;
