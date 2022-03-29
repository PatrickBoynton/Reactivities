import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";


interface Props {
    activity: Activity;
}

const ActivityListItem = ({activity}: Props) => {
	return <Segment.Group>
		<Segment>
			<Item.Group>
				<Item>
					<Item.Image size="tiny" src="/assets/user.png" circular />
					<Item.Content>
						<Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
						<Item.Description>
                            Hosted By Bob
						</Item.Description>
					</Item.Content>
				</Item>
			</Item.Group>
		</Segment>
		<Segment>
			<span>
				<Icon name="clock" /> {activity.date}
				<Icon name="marker" /> {activity.venue}
			</span>
		</Segment>
		<Segment secondary>
            Attendees go here.
		</Segment>
		<Segment clearing>
			<span>{activity.description}</span>
			<Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />
		</Segment>
	</Segment.Group>;
};

export default observer(ActivityListItem);