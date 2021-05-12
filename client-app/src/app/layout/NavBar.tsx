import React, { ReactElement } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

function NavBar({openForm}: Props): ReactElement {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="Reactivities" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="activities"/>
                <Menu.Item>
                    <Button onClick={openForm} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default NavBar;
