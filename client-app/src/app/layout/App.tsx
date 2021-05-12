import React, { ReactElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';

function App(): ReactElement {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/v1/activities/').then((response: AxiosResponse) => {
            console.log(response);
            setActivities(response.data);
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

    return (
        <>
            <NavBar openForm={handleFormOpen}/>
            <Container style={ {marginTop: '7em'} }>
                <ActivityDashboard activities={ activities }
                                   selectedActivity={ selectedActivity }
                                   handleSelectActivity={ handleSelectedActivity }
                                   handleCancelActivity={ handleCancelSelectedActivity }
                                   editMode={ editMode }
                                   openForm={ handleFormOpen }
                                   closeForm={ handleFormClose }
                />
            </Container>
        </>
    );
}

export default App;
