import NotAuthorized from '../../components/NotAuthorized';

function EmailSignup() {
	return (
		<main className="login">
			<NotAuthorized
				isSignup={false}
				showImage={false}
			/>
		</main>
	);
}

export default EmailSignup;
