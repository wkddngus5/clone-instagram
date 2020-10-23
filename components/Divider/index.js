import styles from './Divider.module.css';

function Divider({ content = '' }) {
	return (
		<div className={styles.divider}>
			<div className={styles.horizontalLine}></div>
			<div className={styles.dividerText}>{ content }</div>
			<div className={styles.horizontalLine}></div>
		</div>
	)
}

export default Divider;
