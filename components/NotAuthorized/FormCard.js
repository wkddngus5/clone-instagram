import { useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { getErrorMessage } from '../../lib/form';
import Card from '../Card';
import Input from '../Input';
import Divider from '../Divider';
import styles from './FormCard.module.css';

const SignInMutation = gql`
	mutation SignInMutation($email: String!, $password: String!) {
		signIn(input: { email: $email, password: $password }) {
    		user {
			id
			email
		}
	}
}`

function FormCard() {
	const [signIn] = useMutation(SignInMutation);
	const [errorMsg, setErrorMsg] = useState();
	const client = useApolloClient();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await client.resetStore();
			const { data } = await signIn({
				variables: {
					email,
					password,
				},
			});
		} catch (error) {
			setErrorMsg(getErrorMessage(error))
		}
	}
	return (
		<Card>
			<h1 className={styles.title}>Instagram</h1>
			<div className={styles.formWrapper}>
				<form id="loginForm" method="post" onSubmit={handleSubmit}>
					<div className={styles.formBody}>
						<div className={styles.formItem}>
							<Input
								type="text"
								placeholder="전화번호, 사용자 이름 또는 이메일"
								value={email}
								onChange={setEmail}
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
							<button
								className={`${styles.formSubmit} ${
									email.length > 0 && password.length > 5
										? styles.formSubmitActive
										: ''
								}`}
								onClick={handleSubmit}
							>
								로그인
							</button>
						</div>
						<Divider content="또는" />
						<div className={styles.facebookLoginWrapper}>
							<button className={styles.facebookLoginButton}>
								<span className={styles.facebookLogo} />
								<span
									className={styles.facebookLoginButtonText}
								>
									Facebook으로 로그인
								</span>
							</button>
						</div>
					</div>
					<div
						className={`${styles.errorMessageWrapper} ${
							errorMsg ? '' : styles.hidden
						}`}
					>
						<p style={{ textAlign: 'center' }}>
							잘못된 비밀번호입니다. 다시 확인하세요.
						</p>
					</div>
					<div className={styles.findPasswordButtonWrapper}>
						<a
							className={styles.findPasswordButton}
							href="/accounts/password/reset"
						>
							비밀번호를 잊으셨나요?
						</a>
					</div>
				</form>
			</div>
		</Card>
	);
}

export default FormCard;
