import React, { useState } from 'react';
import Input from '../Input';
import { Home, Direct, Explore, Heart } from '../Icon';
import styles from './Header.module.css';

const { Search } = Input;

function Header({viewer}) {
	const [ searchText, setSearchText ] = useState('');
	if (!viewer) {
		return (<></>);
	}

	return (
		<nav className={styles.Header}>
			<div className={styles.headerContent}>
				<div className={styles.logoLinkContainer}>
					<a href="/" >
						<div className={styles.logoLinkContent}>
							<img alt="Instagram" src="/logo.png" />
						</div>
					</a>
				</div>
				<Search
					placeholder="검색"
					value={searchText}
					onChange={setSearchText} />
				<div className={styles.menu}>
					<div className={styles.menuList}>
						<a
							href="/"
							className={styles.menuItem}>
							<Home />
						</a>
						<a
							href="/direct/inbox"
							className={styles.menuItem}>
							<Direct />
						</a>
						<a 
							href="/explore"
							className={styles.menuItem}>
							<Explore label="사람 찾기" />
						</a>
						<a 
							href="/accounts/activity"
							className={styles.menuItem}>
							<Heart label="활동 피드" />
						</a>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Header;
