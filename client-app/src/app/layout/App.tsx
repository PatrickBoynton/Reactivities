import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import TestErrors from "../../features/errors/TestErrors";
import HomePage from "../../features/home/HomePage";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";


const App = () => {
	const location = useLocation();

	return <>
		<ToastContainer position="bottom-right" hideProgressBar />
		<Route exact path="/" component={HomePage} />
		<Route
			path={"/(.+)"}
			render={() =>
				// noinspection BadExpressionStatementJS
				<>
					<Navbar />
					<Container style={{ marginTop: "7em" }} >
						<Route exact path="/" component={HomePage} />
						<Route exact path="/activities" component={ActivityDashboard} />
						<Route path="/activities/:id" component={ActivityDetails} />
						<Route key={location.key}
							   path={["/createActivity", "/manage/:id"]}
							   component={ActivityForm} />
						<Route path="/errors" component={TestErrors} />
					</Container >
				</>
			}
		/>
	</>;
};

export default observer(App);
