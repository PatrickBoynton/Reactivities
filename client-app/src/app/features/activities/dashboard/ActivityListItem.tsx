import React, { ReactElement } from 'react';
import { Button, Icon, Item, ItemImage, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Activity } from '../../../models/activity';
import { format } from 'date-fns';

interface Props {
    activity: Activity;
}

const ActivityListItem = ({activity}: Props): ReactElement => (
    <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <ItemImage size="tiny" circular src="/assets/user.png"/>
                    <Item.Content>
                        <Item.Header as={ Link } to={ `/activities/${ activity.id }` }>
                            { activity.title }
                        </Item.Header>
                        <Item.Description>Hosted By: Bob</Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>

        <Segment>
      <span>
        <Icon name="clock"/> { format(activity.date!, 'dd MMM yyyy h:m aa') }
          <Icon name="marker"/> { activity.venue }
      </span>
        </Segment>

        <Segment secondary>Attendees go here.</Segment>

        <Segment clearing>
            <span>{ activity.description }</span>
            <Button
                as={ Link }
                to={ `/activities/${ activity.id }` }
                color="teal"
                floated="right"
                content="view"
            />
        </Segment>
    </Segment.Group>
);

export default ActivityListItem;
