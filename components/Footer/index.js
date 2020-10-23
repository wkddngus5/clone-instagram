import React from 'react';
import styles from './Footer.module.css';

function Footer() {
	return (
		<footer className={styles.Footer}>
			<div className={styles.footerContent}>
				<nav>
					<ul className={styles.ul}>
						<li className={styles.li}>소개</li>
						<li className={styles.li}>도움말</li>
						<li className={styles.li}>홍보 센터</li>
						<li className={styles.li}>API</li>
						<li className={styles.li}>채용 정보</li>
						<li className={styles.li}>개인정보처리방침</li>
						<li className={styles.li}>약관</li>
						<li className={styles.li}>위치</li>
						<li className={styles.li}>인기 계정</li>
						<li className={styles.li}>해시태그</li>
						<li className={styles.li}>언어</li>
					</ul>
				</nav>
				<span className={styles.span}>© 2020 INSTAGRAM FROM FACEBOOK</span>
			</div>
		</footer>
	);
}

export default Footer;
