import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

const HomePage = () => {
	return <Segment inverted textAlign="center" vertical className="masthead">
		<Container text>
			<Header as="h1" className="homepage-header">
				<Image size="massive" source="/assets/logo.png" alt="logo" style={{marginBottom: 12}} />
                Reactivities
			</Header>
			<Header as="h2" inverted content="Welcome to Reactivities" />
			<Button as={Link} to="/activities" size="huge" inverted content="Take me to the activities." />
		</Container>
	</Segment>;
};


export default HomePage;