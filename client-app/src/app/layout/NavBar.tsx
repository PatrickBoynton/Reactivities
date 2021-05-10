import React, { ReactElement } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

function NavBar(): ReactElement {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="Reactivities" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="activities"/>
                <Menu.Item>
                    <Button positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default NavBar;
