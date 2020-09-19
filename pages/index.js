import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import SignIn from '../components/signin';

const ViewerQuery = gql`
	query ViewerQuery {
		viewer {
			id
			email
		}
	}
`;

const Index = () => {
	const router = useRouter();
	const { data, loading, error } = useQuery(ViewerQuery);
	const viewer = data?.viewer;
	const showSignIn = !(loading || error || viewer);

	if (showSignIn) {
		return <SignIn />;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	if (viewer) {
		return (
			<div>
				You're signed in as {viewer.email} goto{' '}
				<Link href="/about">
					<a>about</a>
				</Link>{' '}
				page. or{' '}
				<Link href="/signout">
					<a>signout</a>
				</Link>
			</div>
		);
	}

	return <p>Loading...</p>;
};

export default Index;
