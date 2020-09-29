import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { useMutation, useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Field from './field'
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
		<article
			style={{
				display: 'flex',
				flexDirection: 'row',
				flexGrow: 1,
				margin: '64px auto 0',
				justifyContent: 'center',
				maxWidth: '935px',
				paddingBottom: '64px',
				width: '100%',
			}}>
			<div
				className="phone"
				style={{
					backgroundImage: 'url(/home-phone.png)',
					backgroundSize: '454px 618px',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					flexBasis: '454px',
					height: '618px',
				}}
				>
					<div
						className="phone-screen"
						style={{
							margin: '99px 0 0 151px',
							position: 'relative',
						}}>
						<img className={visibleImageIndex === 0 ? styles.visible : null} src="/phone-screen1.jpg" style={screenImageStyle}></img>
						<img className={visibleImageIndex === 1 ? styles.visible : null} src="/phone-screen2.jpg" style={screenImageStyle}></img>
						<img className={visibleImageIndex === 2 ? styles.visible : null} src="/phone-screen3.jpg" style={screenImageStyle}></img>
						<img className={visibleImageIndex === 3 ? styles.visible : null} src="/phone-screen4.jpg" style={screenImageStyle}></img>
					</div>
				</div>
			<div className="form"></div>
		</article>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <button type="submit">Sign in</button> or{' '}
        <Link href="signup">
          <a>Sign up</a>
        </Link>
      </form>
    </main>
  )
}

export default SignIn
