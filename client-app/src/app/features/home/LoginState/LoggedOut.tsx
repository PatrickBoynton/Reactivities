import React, { ReactElement } from 'react';
import { Button } from 'semantic-ui-react';
import ModalStore from '../../../stores/modalStore';
import LoginForm from '../../users/LoginForm';
import RegisterForm from '../../users/RegisterForm';

interface Props {
    modalStore: ModalStore;
}

const LoggedOut = ({modalStore}: Props): ReactElement => {
    return (
        <><Button onClick={() => modalStore.openModal(<LoginForm/>)}
                  to="/login"
                  size="huge"
                  inverted
                  content="Login"/>
            <Button onClick={() => modalStore.openModal(<RegisterForm/>)}
                    to="/login"
                    size="huge"
                    inverted
                    content="Register"/>
        </>
    );
};

export default LoggedOut;
