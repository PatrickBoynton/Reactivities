import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Activity } from "../models/Activity";
import { Container, List } from 'semantic-ui-react';
import Navbar from "./Navbar";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data);
        })
    }, []);

    return (
        <>
            <Navbar/>
            <Container style={{marginTop: '7em'}}>
                <List>
                    {activities.map((activity) => (
                        <List.Item key={activity.id}>
                            {activity.title}
                        </List.Item>
                    ))}
                </List>
            </Container>
        </>
    );
}

export default App;
