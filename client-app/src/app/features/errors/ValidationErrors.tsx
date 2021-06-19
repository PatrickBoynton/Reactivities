import React, { ReactElement } from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}


function ValidationErrors({errors}: Props): ReactElement {
    return (
        <Message error>
            { errors && (
                <Message.List>
                    { errors.map((error: string, index: number) => (
                        <Message.Item key={ index }>
                            { error }
                        </Message.Item>
                    )) }
                </Message.List>
            ) }
        </Message>
    );
}

export default ValidationErrors;
