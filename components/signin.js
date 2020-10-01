import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { useMutation, useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
// import Field from './field'
import Input from './Input';
import styles from './SignIn.module.css';

console.log(Input);
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
  const client = useApolloClient()
  const [signIn] = useMutation(SignInMutation)
  const [errorMsg, setErrorMsg] = useState()
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);
  const router = useRouter()

  useEffect( () => {
	setTimeout(() => {
		setVisibleImageIndex((visibleImageIndex + 1) % 4)
	}, 4000)
  }, [visibleImageIndex]);

  async function handleSubmit(event) {
    event.preventDefault()

    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      await client.resetStore()
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })
      if (data.signIn.user) {
        await router.push('/')
      }
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
					<form onSubmit={handleSubmit}>
						<Input
							value=""
							placeholder="전화번호, 사용자 이름 또는 이메일" />
					</form>
				</div>
				<div className={styles.card}>
					계정이 없으신가요? 가입하기
				</div>
			</div>
		</article>
    </main>
  )
}

export default SignIn
