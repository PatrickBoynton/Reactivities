import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import HomePage from "../../features/home/HomePage";
import LoginForm from "../../features/users/LoginForm";
import Navbar from "./Navbar";


const App = () => {
	const location = useLocation();

	return <>
		<ToastContainer position="bottom-right" hideProgressBar />
		<Route exact path="/" component={HomePage} />
		<Route path={"/(.+)"} render={() =>
			<>
				<Navbar />
				<Container style={{ marginTop: "7em" }}>
					<Switch>
						<Route exact path="/activities" component={ActivityDashboard} />
						<Route path="/activities/:id" component={ActivityDetails} />
						<Route key={location.key} path={["/createActivity", "/manage/:id"]}
							   component={ActivityForm} />
						<Route path="/errors" component={TestErrors} />
						<Route path="/server-error" component={ServerError} />
						<Route path="/login" component={LoginForm} />
						<Route component={NotFound} />
					</Switch>
				</Container>
			</>
		} />
	</>;
};

export default observer(App);
