import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../../lib/form'
import Field from '../../components/field'
import styles from '../../components/SignIn.module.css';
import Input from '../../components/Input';

const screenImageStyle = {
	position: 'absolute',
	width: '240px',
	height: '427px',
	left: 0,
	visibility: 'hidden',
	opacity: 0,
	transition: '3s',
};

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignUp() {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault()
    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      await signUp({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })

      router.push('/')
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <>
      <main>
		<article className={styles.article}>
			<div className={styles.siginContent}>
				<div className={styles.card}>
					<h1 className={styles.title}>Instagram</h1>
					<div className={styles.formWrapper}>
						<form
							id="loginForm"
							method="post"
							onSubmit={handleSubmit}>
							<h2>친구들의 사진과 동영상을 보려면 가입하세요.</h2>
							<div className={styles.formBody}>
								<div className={styles.facebookLoginWrapper}>
									<button className={styles.facebookLoginButton}>
										<span className={styles.facebookLogo} />
										<span className={styles.facebookLoginButtonText}>Facebook으로 로그인</span>
									</button>
								</div>
								<div className={styles.divider}>
									<div className={styles.horizontalLine}></div>
									<div className={styles.dividerText}>또는</div>
									<div className={styles.horizontalLine}></div>
								</div>
								<div className={styles.formItem}>
									<Input
										type="text"
										placeholder="휴대폰 또는 이메일 주소"
										value={email}
										onChange={setEmail} />
								</div>
								<div className={styles.formItem}>
									<Input
										type="text"
										placeholder="성명"
										value={email}
										onChange={setEmail} />
								</div>
								<div className={styles.formItem}>
									<Input
										type="text"
										placeholder="사용자 이름"
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
										onClick={handleSubmit}>가입</button>
								</div>
							</div>
							<div className={`${styles.errorMessageWrapper} ${errorMsg ? '' : styles.hidden}`}>
								<p style={{textAlign: 'center'}}>
									잘못된 비밀번호입니다. 다시 확인하세요.
								</p>
							</div>
							<div className={styles.findPasswordButtonWrapper}>
								<p>
									가입하면 Instagram의 
									<a>약관</a>
									, 
									<a>데이터 정책</a> 및 
									<a>쿠키 정책</a>
									에 동의하게 됩니다.
								</p>
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
    </>
  )
}

export default SignUp
