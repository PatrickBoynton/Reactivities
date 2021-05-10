import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/activities/').then((response: AxiosResponse) => {
            console.log(response);
            setActivities(response.data);
        });
    }, []);

    return (
        <>
            <Header as='h2' icon='users' content='Reactivities'/>
            <List>
                { activities.map((activity: any) => (
                    <List.Item key={ activity.id }>
                        { activity.title }
                    </List.Item>
                )) }
            </List>
        </>
    );
}

export default App;
