import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { gql } from '@apollo/client'
import { useMutation, useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Input from './Input';
import styles from './SignIn.module.css';

const screenImageStyle = {
	position: 'absolute',
	width: '240px',
	height: '427px',
	left: 0,
	visibility: 'hidden',
	opacity: 0,
	transition: '3s',
};

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = useState();
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect( () => {
	setTimeout(() => {
		setVisibleImageIndex((visibleImageIndex + 1) % 4);
	}, 4000)
  }, [visibleImageIndex]);

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
    <main>
		<article className={styles.article}>
			<div className={styles.phone}>
				<div
					className={styles.phoneScreen}>
					<img className={ `${ styles.phoneScreenImage } ${ visibleImageIndex === 0 ? styles.visible : '' }`} src="/phone-screen1.jpg" style={screenImageStyle}></img>
					<img className={ `${ styles.phoneScreenImage } ${ visibleImageIndex === 1 ? styles.visible : '' }`} src="/phone-screen2.jpg" style={screenImageStyle}></img>
					<img className={ `${ styles.phoneScreenImage } ${ visibleImageIndex === 2 ? styles.visible : '' }`} src="/phone-screen3.jpg" style={screenImageStyle}></img>
					<img className={ `${ styles.phoneScreenImage } ${ visibleImageIndex === 3 ? styles.visible : '' }`} src="/phone-screen4.jpg" style={screenImageStyle}></img>
				</div>
			</div>
			<div className="form-container">
				<div className={styles.card}>
					<h1 className={styles.title}>Instagram</h1>
					<div className={styles.formWrapper}>
						<form
							id="loginForm"
							method="post"
							onSubmit={handleSubmit}>
							<div className={styles.formBody}>
								<div className={styles.formItem}>
									<Input
										type="text"
										placeholder="전화번호, 사용자 이름 또는 이메일"
										value={email}
										onChange={setEmail} />
								</div>
								<div className={styles.formItem}>
									<Input
										type="password"
										placeholder="비밀번호"
										value={password}
										onChange={setPassword} />
								</div>
								<div className={styles.formSubmitWrapper}>
									<button
										className={`${styles.formSubmit} ${email.length > 0 && password.length > 5 ? styles.formSubmitActive : ''}`}
										onClick={handleSubmit}>로그인</button>
								</div>
								<div className={styles.divider}>
									<div className={styles.horizontalLine}></div>
									<div className={styles.dividerText}>또는</div>
									<div className={styles.horizontalLine}></div>
								</div>
								<div className={styles.facebookLoginWrapper}>
									<button className={styles.facebookLoginButton}>
										<span className={styles.facebookLogo} />
										<span className={styles.facebookLoginButtonText}>Facebook으로 로그인</span>
									</button>
								</div>
							</div>
							<div className={`${styles.errorMessageWrapper} ${errorMsg ? '' : styles.hidden}`}>
								<p style={{textAlign: 'center'}}>
									잘못된 비밀번호입니다. 다시 확인하세요.
								</p>
							</div>
							<div className={styles.findPasswordButtonWrapper}>
								<a
									className={styles.findPasswordButton}
									href="/accounts/password/reset">
									비밀번호를 잊으셨나요?
								</a>
							</div>
						</form>
					</div>
				</div>
				<div className={styles.card}>
					<div>
						<p style={{
							display: 'block',
							width: 'fit-content',
							margin: '15px auto',
							color: 'rgba(var(--i1d,38,38,38),1)',
							fontSize: '14px',
							cursor: 'pointer',
						}}>
							계정이 없으신가요?&nbsp;
							<a
								style={{
									color: '#0095f6',
									textDecoration: 'none',
								}}
								href="/accounts/emailsignup">가입하기</a>
						</p>
					</div>
				</div>
				<div style={{display: 'inline-block'}}>
					<p className={styles.downloadAppText}>앱을 다운로드하세요.</p>
					<div style={{
						justifyContent: 'center',
						margin: '10px 0 10px 0',
						display: 'inherit',
					}}>
						<a
							href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo"
							style={{marginRight: '8px'}}>
							<img
								alt="App Store에서 이용 가능"
								src="/app-store.png"
								style={{height: '48px'}} />
						</a>
						<a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DC653CE7C-AC7F-48F6-8F04-72C66D93C153%26utm_content%3Dlo%26utm_medium%3Dbadge">
							<img
								alt="Google Play에서 이용 가능"
								src="/play-store.png"
								style={{height: '48px'}} />
						</a>
					</div>
				</div>
			</div>
		</article>
    </main>
  )
}

export default SignIn
