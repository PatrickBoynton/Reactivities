import React, { ReactElement } from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function NotFound(): ReactElement {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops what you are looking for does not exist.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    );
}

export default NotFound;
