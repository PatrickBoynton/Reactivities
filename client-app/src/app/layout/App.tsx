import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Activity } from "../models/Activity";
import { Container } from 'semantic-ui-react';
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data);
        })
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(activity => activity.id === id))
    }

    const handleCancelActivity = () => {
        setSelectedActivity(undefined);
    }

    return (
        <>
            <Navbar/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard activities={activities}
                                   selectedActivity={selectedActivity}
                                   selectActivity={handleSelectActivity}
                                   cancelSelectActivity={handleCancelActivity}/>
            </Container>
        </>
    );
}

export default App;
