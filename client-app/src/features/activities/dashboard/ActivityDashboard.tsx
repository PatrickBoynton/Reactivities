import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
    const {activityStore} = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    const {selectedActivity, editMode} = activityStore;

    if (activityStore.loadingInitial) return <LoadingComponent/>;

    return <Grid>
        <Grid.Column width="10">
            <ActivityList/>
        </Grid.Column>
        <Grid.Column width="6">
            {selectedActivity && !editMode &&
                <ActivityDetails/>}
            {editMode &&
                <ActivityForm/>}
        </Grid.Column>
    </Grid>;
};

export default observer(ActivityDashboard);