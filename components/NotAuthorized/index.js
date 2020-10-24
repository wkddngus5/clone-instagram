import Phone from '../Phone';
import SigninCard from './SigninCard';
import SignupCard from './SignupCard';
import ToggleSigninAndSignupCard from './ToggleSigninAndSignupCard';
import DownloadAppButtons from './DownloadAppButtons';
import styles from './NotAuthorized.module.css';

function NotAuthorized({ className, showImage = false, isSignup = false }) {
	return (
		<article className={`${styles.article} ${className} ${showImage ? styles.showImage : ''}`}>
			{ showImage && ( <Phone /> )}
			<div className={styles.siginContent}>
				{
					isSignup
						? (<SignupCard />)
						: (<SigninCard />)
				}
				<ToggleSigninAndSignupCard isSignup={isSignup} />
				<DownloadAppButtons />
			</div>
		</article>
	);
}

export default NotAuthorized;