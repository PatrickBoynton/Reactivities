import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponents";
import Navbar from "./Navbar";

const App = () => {
    const {activityStore} = useStore();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

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
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }
    };

    const handleDeleteActivity = (id: string) => {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(activity => activity.id !== id)]);
            setSubmitting(false);
        });
    };

    if (activityStore.loadingInitial) return <LoadingComponent/>;

    return (
        <>
            <Navbar openForm={handleFormOpen}/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard activities={activityStore.activities}
                                   selectedActivity={selectedActivity}
                                   selectActivity={handleSelectActivity}
                                   cancelSelectActivity={handleCancelActivity}
                                   editMode={editMode}
                                   openForm={handleFormOpen}
                                   closeForm={handleFormClose}
                                   createOrEdit={handleEditOrCreateActivity}
                                   deleteActivity={handleDeleteActivity}
                                   submitting={submitting}
                />
            </Container>
        </>
    );
};

export default observer(App);
