import NotAuthorized from '../../components/NotAuthorized';

function EmailSignup() {
	return (
		<main className="emailsignup">
			<NotAuthorized
				isSignup
				showImage={false}
			/>
		</main>
	);
}

export default EmailSignup;
