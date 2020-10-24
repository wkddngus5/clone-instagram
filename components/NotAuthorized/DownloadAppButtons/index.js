import styles from './DownloadAppButtons.module.css';

function DownloadAppButtons() {
	return (
		<div className={styles.DownloadAppButtons}>
			<p className={styles.downloadAppText}>앱을 다운로드하세요.</p>
			<div className={styles.buttons}>
				<a
					href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo"
					style={{ marginRight: '8px' }}
					target="_blank"
				>
					<img
						className={styles.buttonImage}
						alt="App Store에서 이용 가능"
						src="/app-store.png"
					/>
				</a>
				<a
					href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DC653CE7C-AC7F-48F6-8F04-72C66D93C153%26utm_content%3Dlo%26utm_medium%3Dbadge"
					target="_blank">
					<img
						className={styles.buttonImage}
						alt="Google Play에서 이용 가능"
						src="/play-store.png"
					/>
				</a>
			</div>
		</div>
	);
}

export default DownloadAppButtons;
