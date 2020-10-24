import Card from '../../Card';
import styles from './ToggleSigninAndSignupCard.module.css';

function ToggleSigninAndSignupCard({ isSignup = false }) {
	return (
		<Card>
			<div>
				<p className={styles.text}>
					{
						isSignup
							? '계정이 있으신가요?'
							: '계정이 없으신가요?'
					}
					&nbsp;
					{
						isSignup
							? (
								<a
									className={styles.link}
									href="/accounts/login">로그인</a>
							) : (
								<a
									className={styles.link}
									href="/accounts/emailsignup">가입하기</a>
							)
					}
				</p>
			</div>
		</Card>
	)
}

export default ToggleSigninAndSignupCard;
