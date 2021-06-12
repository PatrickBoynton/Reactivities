import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const LoggedOut = () => {
    return (
        <><Button as={ Link }
                  to="/login"
                  size="huge"
                  inverted
                  content="Login"/>
        </>
    );
};

export default LoggedOut;
