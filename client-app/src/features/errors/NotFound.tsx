import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return <Segment>
		<Header icon>
			<Icon name="search" />
			Oops - we&apos;ve looked everywhere and can&apos;t find what you are looking for!
		</Header>
		<Segment.Inline>
			<Button as={Link} to="/activities" content="Return to activities page." />
		</Segment.Inline>
	</Segment>;
};

export default NotFound;