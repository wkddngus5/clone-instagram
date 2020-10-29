import React from 'react';
import styles from './Header.module.css';

function Header({viewer}) {
	console.log(viewer)
	if (!viewer) {
		return (<></>);
	}
	return (
		<nav className={styles.Header}>
			<div className={styles.headerContent}>
				<a href="/" >
					<div className={styles.logoLinkContent}>
						<img alt="Instagram" src="/logo.png" />
					</div>
				</a>
			</div>
		</nav>
	)
}

export default Header;
