import Card from '../Card';
import Phone from '../Phone';
import FormCard from './FormCard';
import ToggleSigninAndSignupCard from './ToggleSigninAndSignupCard';
import DownloadAppButtons from './DownloadAppButtons';
import styles from './NotAuthorized.module.css';

function NotAuthorized({ showImage = false }) {
	return (
		<article className={styles.article}>
			{ showImage && ( <Phone /> )}
			<div className={styles.siginContent}>
				<FormCard />
				<ToggleSigninAndSignupCard />
				<DownloadAppButtons />
			</div>
		</article>
	);
}

export default NotAuthorized;