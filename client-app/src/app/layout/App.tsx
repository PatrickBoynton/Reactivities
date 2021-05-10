import React, { ReactElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';

function App(): ReactElement {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/v1/activities/').then((response: AxiosResponse) => {
            console.log(response);
            setActivities(response.data);
        });
    }, []);

    return (
        <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard activities={activities}/>
            </Container>
        </>
    );
}

export default App;
