import React, { ReactElement } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

const ActivityFilters = (): ReactElement => (
    <>
        <Menu vertical size='large' style={ {width: '100%'} }>
            <Header icon='filter' attached color='teal' content='filters'/>
            <Menu.Item content='All Activities'/>
            <Menu.Item content="I'm going"/>
            <Menu.Item content="I'm hosting"/>
        </Menu>
        <Header/>
        <Calendar/>
    </>
);

export default ActivityFilters;
