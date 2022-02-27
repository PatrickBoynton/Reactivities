import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponents";
import Navbar from "./Navbar";

const App = () => {
    const {activityStore} = useStore();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

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
            <Navbar/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard activities={activityStore.activities}
                                   deleteActivity={handleDeleteActivity}
                                   submitting={submitting}
                />
            </Container>
        </>
    );
};

export default observer(App);
