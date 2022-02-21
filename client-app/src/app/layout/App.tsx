import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/Activity";
import Navbar from "./Navbar";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
            setActivities(response.data);
        });
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(activity => activity.id === id));
    };

    const handleCancelActivity = () => {
        setSelectedActivity(undefined);
    };

    const handleFormOpen = (id?: string) => {
        id ? handleSelectActivity(id) : handleCancelActivity();
        setEditMode(true);
    };

    const handleFormClose = () => {
        setEditMode(false);
    };

    const handleEditOrCreateActivity = (activity: Activity) => {
        activity.id ?
            setActivities([...activities.filter(activity => activity.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()}]);

        setEditMode(false);
        setSelectedActivity(activity);
    };

    return (
        <>
            <Navbar openForm={handleFormOpen}/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard activities={activities}
                                   selectedActivity={selectedActivity}
                                   selectActivity={handleSelectActivity}
                                   cancelSelectActivity={handleCancelActivity}
                                   editMode={editMode}
                                   openForm={handleFormOpen}
                                   closeForm={handleFormClose}
                                   createOrEdit={handleEditOrCreateActivity}
                />
            </Container>
        </>
    );
}

export default App;
