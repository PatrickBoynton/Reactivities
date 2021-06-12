import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LoggedIn = () => {
    return (
        <>
            <Header as="h2" inverted content="Welcome to Reactivities"/>
            <Button as={ Link }
                    to="/activities"
                    size="huge"
                    inverted
                    content="Go to activities!"/>
        </>
    );
};

export default LoggedIn;
