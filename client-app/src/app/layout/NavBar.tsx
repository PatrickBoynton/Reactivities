import React, { ReactElement } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const NavBar = (): ReactElement => (
    <Menu inverted fixed="top">
        <Container>
            <Menu.Item exact as={ NavLink } to='/' header>
                <img src="/assets/logo.png" alt="Reactivities" style={ {marginRight: '10px'} }/>
                Reactivities
            </Menu.Item>
            <Menu.Item as={ NavLink } to='/activities' name="activities"/>
            <Menu.Item as={ NavLink } to='/errors' name="errors"/>
            <Menu.Item>
                <Button as={ NavLink } to='/create' positive content="Create Activity"/>
            </Menu.Item>
        </Container>
    </Menu>
);

export default NavBar;
