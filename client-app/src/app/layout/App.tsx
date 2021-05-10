import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/v1/activities/').then((response: AxiosResponse) => {
            console.log(response);
            setActivities(response.data);
        });
    }, []);

    return (
        <>
            <Header as='h2' icon='users' content='Reactivities'/>
            <List>
                { activities.map(activity => (
                    <List.Item key={ activity.id }>
                        { activity.title }
                    </List.Item>
                )) }
            </List>
        </>
    );
}

export default App;
