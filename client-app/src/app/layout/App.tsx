import React, { ReactElement } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import  { Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ActivityForm from '../features/activities/form/ActivityForm';

function App(): ReactElement {

    return (
        <>
            <NavBar />
            <Container style={ {marginTop: '7em'} }>
                <Route exact path='/' component={HomePage}/>
                <Route path='/activities' component={ActivityDashboard}/>
                <Route path='/create' component={ActivityForm}/>
            </Container>
        </>
    );
}

export default observer(App);
