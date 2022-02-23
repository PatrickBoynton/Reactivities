import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import LoadingComponent from "./LoadingComponents";
import Navbar from "./Navbar";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Activities.list().then(response => {
            let activities: Activity[] = [];

            response.forEach(activity => {
                activity.date = activity.date.split("T")[0];
                activities.push(activity);
            });

            setActivities(activities);
            setLoading(false);
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

    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(activity => activity.id !== id)]);
    };

    if (loading) return <LoadingComponent/>;

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
                                   deleteActivity={handleDeleteActivity}
                />
            </Container>
        </>
    );
}

export default App;
