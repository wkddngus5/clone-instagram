import { useState, useEffect } from 'react';
import styles from './Phone.module.css';

function Phone() {
	const [visibleImageIndex, setVisibleImageIndex] = useState(0);

	useEffect( () => {
		setTimeout(() => {
			setVisibleImageIndex((visibleImageIndex + 1) % 4);
		}, 4000);
	}, [visibleImageIndex]);

	return (
		<div className={styles.Phone}>
			<div
				className={styles.screen}>
				<img className={ `${ styles.screenImage } ${ visibleImageIndex === 0 ? styles.visible : '' }`} src="/phone-screen1.jpg" ></img>
				<img className={ `${ styles.screenImage } ${ visibleImageIndex === 1 ? styles.visible : '' }`} src="/phone-screen2.jpg" ></img>
				<img className={ `${ styles.screenImage } ${ visibleImageIndex === 2 ? styles.visible : '' }`} src="/phone-screen3.jpg" ></img>
				<img className={ `${ styles.screenImage } ${ visibleImageIndex === 3 ? styles.visible : '' }`} src="/phone-screen4.jpg" ></img>
			</div>
		</div>
	);
}

export default Phone;
