import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import NotAuthorized from '../components/NotAuthorized';
import Header from '../components/Header';

const ViewerQuery = gql`
	query ViewerQuery {
		viewer {
			id
			email
		}
	}
`;

const Index = () => {
	const { data, loading, error } = useQuery(ViewerQuery);
	const viewer = data?.viewer;
	const showSignIn = !(loading || error || viewer);

	let content = <>Loading</>;

	if (showSignIn) {
		content = <NotAuthorized showImage />;
	} else if (error) {
		content = <p>{error.message}</p>;
	} else if (viewer) {
		content = (
			<div>
				You're signed in as {viewer.email} goto
				<Link href="/about">
					<a>about</a>
				</Link>
				page. or
				<Link href="/signout">
					<a>signout</a>
				</Link>
			</div>
		);
	}

	return (
		<>
			<Header viewer={viewer} />
			<main>{content}</main>
		</>
	);
};

export default Index;
