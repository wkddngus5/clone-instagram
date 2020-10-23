import Card from '../Card';
import Phone from '../Phone';
import FormCard from './FormCard';
import styles from './NotAuthorized.module.css';

function NotAuthorized({ showImage = false }) {
	return (
		<article className={styles.article}>
			{ showImage && ( <Phone /> )}
			<div className={styles.siginContent}>
				<FormCard />
				<Card>
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
				</Card>
				<div style={{display: 'inline-block', width: '100%'}}>
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
	);
}

export default NotAuthorized;