import React, { ReactElement } from 'react';
import { Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import LoggedIn from './LoginState/LoggedIn';
import LoggedOut from './LoginState/LoggedOut';


const HomePage = (): ReactElement => {
    const {userStore} = useStore();
    return <>
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive"
                           src="/assets/logo.png"
                           alt="logo"
                           style={ {marginBottom: 12} }/>
                    Reactivities
                </Header>
                { userStore.isLoggedIn ? <LoggedIn/> : <LoggedOut/> }
            </Container>
        </Segment>
    </>;
};

export default observer(HomePage);
