import { useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { getErrorMessage } from '../../../lib/form';
import Card from '../../Card';
import Input from '../../Input';
import Divider from '../../Divider';
import Button from '../../Button';
import styles from './SignupCard.module.css';

const SignUpMutation = gql`
	mutation SignUpMutation(
		$email: String!
		$fullName: String!
		$username: String!
		$password: String!
	) {
		signUp(
			input: {
				email: $email
				fullName: $fullName
				username: $username
				password: $password
			}
		) {
			user {
				id
				email
				fullName
				username
			}
		}
	}
`;

function SignupCard() {
	const [signUp] = useMutation(SignUpMutation);
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState();
	const client = useApolloClient();
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit() {
		try {
			const { data } = await signUp({
				variables: {
					email,
					fullName,
					username,
					password,
				},
			});
			router.push('/accounts/login');
		} catch (error) {
			setErrorMsg(getErrorMessage(error));
		}
	}
	return (
		<Card>
			<h1 className={styles.title}>Instagram</h1>
			<h2 className={styles.subTitle}>
				친구들의 사진과 동영상을 보려면 가입하세요.
			</h2>
			<div className={styles.formWrapper}>
				<form id="loginForm" method="post" onSubmit={handleSubmit}>
					<div className={styles.formBody}>
						<Button className={styles.facebookLoginButton}>
							<span className={styles.facebookLogo} />
							Facebook으로 로그인
						</Button>
						<Divider content="또는" />
						<div className={styles.formItem}>
							<Input
								type="text"
								placeholder="휴대폰 번호 또는 이메일 주소"
								value={email}
								onChange={setEmail}
							/>
						</div>
						<div className={styles.formItem}>
							<Input
								type="text"
								placeholder="성명"
								value={fullName}
								onChange={setFullName}
							/>
						</div>
						<div className={styles.formItem}>
							<Input
								type="text"
								placeholder="사용자 이름"
								value={username}
								onChange={setUsername}
							/>
						</div>
						<div className={styles.formItem}>
							<Input
								type="password"
								placeholder="비밀번호"
								value={password}
								onChange={setPassword}
							/>
						</div>
						<div className={styles.formSubmitWrapper}>
							<Button
								className={`${styles.formSubmit}`}
								isDisabled={
									email.length === 0 || password.length < 5
								}
								onClick={handleSubmit}
							>
								가입
							</Button>
						</div>
					</div>
					<div
						className={`${styles.errorMessageWrapper} ${
							errorMsg ? '' : styles.hidden
						}`}
					>
						<p className={styles.errorMessage}>
							잘못된 비밀번호입니다. 다시 확인하세요.
						</p>
					</div>
					<div className={styles.termsNotice}>
						<p>
							가입하면 Instagram의 약관, 데이터 정책 및 쿠키
							정책에 동의하게 됩니다.
						</p>
					</div>
				</form>
			</div>
		</Card>
	);
}

export default SignupCard;
