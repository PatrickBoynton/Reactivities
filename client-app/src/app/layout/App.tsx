import React, { ReactElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';

function App(): ReactElement {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

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

    return (
        <>
            <NavBar/>
            <Container style={ {marginTop: '7em'} }>
                <ActivityDashboard activities={ activities }
                                   selectedActivity={ selectedActivity }
                                   handleSelectActivity={ handleSelectedActivity }
                                   handleCancelActivity={ handleCancelSelectedActivity }
                />
            </Container>
        </>
    );
}

export default App;
