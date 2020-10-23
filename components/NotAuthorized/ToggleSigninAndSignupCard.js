import Card from '../Card';
import styles from './ToggleSigninAndSignupCard.module.css';

function ToggleSigninAndSignupCard() {
	return (
		<Card>
			<div>
				<p className={styles.text}>
					계정이 없으신가요?&nbsp;
					<a
						className={styles.link}
						href="/accounts/emailsignup">가입하기</a>
				</p>
			</div>
		</Card>
	)
}

export default ToggleSigninAndSignupCard;
