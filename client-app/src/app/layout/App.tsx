import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import Navbar from "./Navbar";

const App = () => {
    return (
        <>
            <Navbar/>
            <Container style={{marginTop: "7em"}}>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/activities" component={ActivityDashboard}/>
                <Route path="/activities/:id" component={ActivityDetails}/>
                <Route path="/createActivity" component={ActivityForm}/>
            </Container>
        </>
    );
};

export default observer(App);
