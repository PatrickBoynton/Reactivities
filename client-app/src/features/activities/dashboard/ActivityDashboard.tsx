import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
	const {activityStore} = useStore();
	const {loadActivities, activityRegistry} = activityStore;

	useEffect(() => {
		if (activityRegistry.size <= 1) {
			loadActivities();
		}
	}, [activityStore]);

	if (activityStore.loadingInitial) return <LoadingComponent/>;

	return <Grid>
		<Grid.Column width="10">
			<ActivityList/>
		</Grid.Column>
		<Grid.Column width="6">
			<h1>Activity Filters</h1>
		</Grid.Column>
	</Grid>;
};

export default observer(ActivityDashboard);