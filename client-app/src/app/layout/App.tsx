import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponents";
import Navbar from "./Navbar";

const App = () => {
    const {activityStore} = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent/>;

    return (
        <>
            <Navbar/>
            <Container style={{marginTop: "7em"}}>
                <ActivityDashboard />
            </Container>
        </>
    );
};

export default observer(App);
